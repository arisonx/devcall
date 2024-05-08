import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@Injectable()
export class SocketService {
  private readonly connectedClients: Map<string, boolean> = new Map();

  handle_connection(socket: Socket, serverSocket: Server): void {
    const client_id = socket.id;
    this.connectedClients.set(client_id, socket.connected);

    socket.join('chatroom');

    const roomclients = serverSocket.sockets.adapter.rooms.get('chatroom');

    console.log(roomclients);
  }

  handleMessageBroadcast(socket: Socket, payload: string) {
    console.log(payload);

    socket.to('chatroom').emit('message', {
      from: socket.id,
      payload: payload,
    });
  }

  handleDisconectedClients(socket: Socket) {
    console.log('disconected client');
    socket.disconnect(true);
  }

  handleTyping(socket: Socket, username: string) {
    socket.to('chatroom').emit('typing', username);
  }
}
