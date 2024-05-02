import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class SocketService {
  private readonly connectedClients: Map<string, boolean> = new Map();

  handle_connection(socket: Socket): void {
    const client_id = socket.id;

    this.connectedClients.set(client_id, socket.connected);

    console.log(this.connectedClients);
  }

  handleMessageBroadcast(socket: Socket, payload: string): void {
    socket.emit('broadcast', {
      from: socket.id,
      payload: payload
    });
    console.log(payload);
  }
}
