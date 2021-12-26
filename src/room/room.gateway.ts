import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { RoomService } from './room.service';
import { JwtWsAuthGuard } from '../auth/jwt-ws.guard';

const events = {
  createRoom: 'room_create',
  roomCreated: 'room_created',
  connectClient: 'client_connect',
  clientConnected: 'client_connected',
  startQuiz: 'quiz_start',
  quizStarted: 'quiz_started',
  nextQuestion: 'next_question',
  receiveAnswer: 'answer_sent',
  quizFinished: 'quiz_finished',
};

type HandleCreateRoomProps = {
  adminId: number;
  quizId: number;
};

type HandleConnectClientProps = {
  userId: number;
  code: string;
};

type HandleStartQuizProps = {
  code: string;
};

type HandleReceiveAnswerProps = {
  userId: number;
  answerId: number;
};

@UseGuards(JwtWsAuthGuard)
@WebSocketGateway({
  port: 3000,
})
export class RoomGateway {
  @WebSocketServer() private wss: Server;

  private readonly rooms: Map<string, Map<string, Socket>>;

  // Round time in seconds
  private readonly roundTime = 30;

  constructor(private readonly roomService: RoomService) {
    this.rooms = new Map();
  }

  @SubscribeMessage(events.createRoom)
  async handleCreateRoom(client: Socket, data: HandleCreateRoomProps) {
    const room = await this.roomService.create(data);
    this.rooms.set(room.code, new Map([[client.id, client]]));
    client.join(room.code);
    client.emit(events.roomCreated, room.code);
  }

  @SubscribeMessage(events.connectClient)
  async handleConnectClient(
    client: Socket,
    { userId, code }: HandleConnectClientProps,
  ) {
    console.log('ClientConnected to room', code);
    client.join(code);
    const room = this.rooms.get(code);
    room.set(client.id, client);
    await this.roomService.saveRoomUser(userId, code);
    this.wss.to(code).emit(events.clientConnected, room.size - 1);
  }

  @SubscribeMessage(events.startQuiz)
  async handleStartQuiz(client: Socket, { code }: HandleStartQuizProps) {
    console.log('Start');
    this.wss.to(code).emit(events.quizStarted, this.roundTime);
    const questions = await this.roomService.getQuestionsByCode(code);
    let questionNumber = 1;
    const questGenerator = () => {
      console.log('next_quest');
      const currentQuestion = questions[questionNumber - 1];
      if (currentQuestion) {
        const clientQuestion = {
          id: currentQuestion.id,
          text: currentQuestion.text,
          answers: currentQuestion.answers.map((answer) => ({
            id: answer.id,
            text: answer.text,
          })),
          number: questionNumber,
        };
        this.wss.to(code).emit(events.nextQuestion, clientQuestion);
        questionNumber++;
      } else {
        this.wss.to(code).emit(events.quizFinished);
        clearInterval(interval);
      }
    };
    questGenerator();
    const interval = setInterval(questGenerator, this.roundTime * 1000);
  }

  @SubscribeMessage(events.receiveAnswer)
  async handleReceiveAnswer(
    client: Socket,
    { userId, answerId }: HandleReceiveAnswerProps,
  ) {
    await this.roomService.saveUserAnswer(userId, answerId);
  }
}
