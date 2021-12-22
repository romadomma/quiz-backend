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
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RoomService } from './room.service';
import { JwtWsAuthGuard } from '../auth/jwt-ws.guard';

const events = {
  createRoom: 'room_create',
  roomCreated: 'room_created',
  connectClient: 'client_connect',
  clientConnected: 'client_connected',
  startQuiz: 'quiz_start',
  quizStarted: 'quiz_started',
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

@UseGuards(JwtWsAuthGuard)
@WebSocketGateway({
  port: 3000,
  // transports: 'websocket',
})
export class RoomGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() private wss: Server;

  private readonly rooms: Map<string, Map<string, Socket>>;

  constructor(private readonly roomService: RoomService) {
    this.rooms = new Map();
  }

  handleDisconnect(client: Socket): any {
    // this.connections.delete(client.id);
    // this.wss.emit(events.connectionAmount, this.connections.size);
  }

  handleConnection(client: Socket, ...args: any[]) {
    // this.connections.set(client.id, client);
    // this.wss.emit(events.connectionAmount, this.connections.size);
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
    const room = this.rooms.get(code);
    room.set(client.id, client);
    await this.roomService.saveRoomUser(userId, code);
    this.wss.to(code).emit(events.clientConnected, room.size);
  }

  @SubscribeMessage(events.startQuiz)
  async handleStartQuiz(client: Socket, data: HandleStartQuizProps) {
    this.wss.to(data.code).emit(events.quizStarted);
  }
}
