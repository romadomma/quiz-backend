import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway(3000)
export class RoomGateway {
  @SubscribeMessage('test')
  test(@MessageBody() data: string) {
    return data;
  }
}
