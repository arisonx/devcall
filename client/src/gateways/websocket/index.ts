import { io, Socket } from 'socket.io-client';
import {
 SocketInitializationType,
 WebSocketGateway,
 MessageBroadcastType,
} from './type';
import {  useWebSocketStore} from '@/globalstate/currentSocketStore';
export class SocketGateway implements WebSocketGateway {
 static socket: Socket;

 public startConnection({ autoConnect }: SocketInitializationType) {
  SocketGateway.socket = io('http://localhost:4000', {
   autoConnect: autoConnect,
  });
 }

 public emitMessage(message: string) {
  SocketGateway.socket.emit('message', message);
 }

 public listenBroadcast() {
  const messagesMap: Map<string, string> = new Map();
  SocketGateway.socket?.on('broadcast', (data: MessageBroadcastType) => {
    console.log('broadcast event listening')
   useWebSocketStore().getState().setMessageBroadcast(data);
  });
  return messagesMap;
 }
}
