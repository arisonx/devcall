import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { SocketService } from './socket.service';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
})
export class SocketGateway implements OnGatewayConnection {
  @WebSocketServer()
  private server: Socket;

  constructor(private readonly socketService: SocketService) {}

  handleConnection(socket: any, ...args: any[]) {
    this.socketService.handle_connection(socket);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: string) {
    this.socketService.handleMessageBroadcast(client, payload);
  }
}
