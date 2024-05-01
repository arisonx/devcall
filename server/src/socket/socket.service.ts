import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class SocketService {
  private readonly connectedClients: Map<string, Socket> = new Map();

  handle_connection(socket: Socket): void {
    const client_id = socket.id;

    this.connectedClients.set(client_id, socket);

    console.log(client_id);
  }


  handleMessageBroadcast(socket: Socket, payload: string): void {
    console.log(payload);
  }
}
