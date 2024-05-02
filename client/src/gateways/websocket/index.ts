import { io, Socket } from 'socket.io-client';
import {
 SocketInitializationType,
 WebSocketGateway,
 MessageBroadcastType,
} from './type';

export class SocketGateway implements WebSocketGateway {
 static socket: Socket;

 public startConnection({ autoConnect }: SocketInitializationType) {
   SocketGateway.socket = io('http://localhost:4000', {
   autoConnect: autoConnect,
  })
 }

 public emitMessage(message: string) {
  SocketGateway.socket.emit('message', message);
 }

 public getMessagesBroadcast() {
    SocketGateway.socket?.on("broadcast", (data:MessageBroadcastType) =>{
        console.log(data)
    })
 }
}
