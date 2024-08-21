import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  SubscribeMessage,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { SocketService } from './socket.service';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private server: Server;

  constructor(private readonly socketService: SocketService) {}

  handleConnection(socket: Socket, ...args: any[]) {
    this.socketService.handle_connection(socket, this.server);
  }

  handleDisconnect(socket: Socket, ...args: any[]) {
    this.socketService.handleDisconectedClients(socket);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: string) {
    this.socketService.handleRoomMessage(client, payload);
  }

  @SubscribeMessage("typing")
  handleTyping(client: Socket, username: string) {
    this.socketService.handleTyping(client, username);
  }
}