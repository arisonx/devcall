'use client';
import { SocketGateway } from '@/gateways/websocket';
import { InputMessage } from './components/input';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Messages } from './components/messages';
import { WebSocketStore } from '@/providers/WebsocketProvider';

export default function Chat() {
 const [message, setMessage] = useState<string | undefined>();
 const socketRef = useRef<SocketGateway>();
 const socketGateway = new SocketGateway();

 useState<Map<string, string> | undefined>();
 const { messages } = WebSocketStore((state) => state);

 const sendMessage = () => {
  socketRef.current?.emitMessage(message as string);
 };

 useEffect(() => {
  if (!socketRef.current) {
   socketRef.current = socketGateway;
   socketRef.current.startConnection({ autoConnect: true });
   socketRef.current.listenBroadcast();
  }
 }, []);

 return (
  <div className='flex h-full w-full flex-col justify-between border-2 border-white'>
   <div className='h-[90%]'>
    <h2 className='text-white'> Hello world</h2>
   </div>

   <Button
    onClick={() => {
     console.log(messages);
    }}
   >
    Show messages broadcast
   </Button>

   <div className='h[10%]'>
    <InputMessage setMessage={setMessage} messageEmitter={sendMessage} />
   </div>
  </div>
 );
}
