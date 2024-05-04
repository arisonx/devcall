'use client';
import { InputMessage } from './components/input';
import { useEffect, useRef, useState } from 'react';
import { Messages } from './components/messages';
import { io, Socket } from 'socket.io-client';
import { Button } from '@/components/ui/button';

export default function Chat() {
 const socketRef = useRef<Socket>();

 type messagesT = {
  from: string;
  payload: string;
 };

 const [message, setMessage] = useState<string | undefined>();
 const [broadcastMessages, setBroadcastMessages] = useState<messagesT[]>([]);

 const sendMessage = () => {
  socketRef.current?.emit('message', message as string);
 };

 useEffect(() => {
  if (!socketRef.current) {
   socketRef.current = io('http://localhost:4000');
   socketRef.current?.on('broadcast', (data: messagesT) => {
    setBroadcastMessages((prevMessages) => [...prevMessages, data]);
   });
  }
 }, [broadcastMessages]);

 return (
  <div className='flex h-full w-full flex-col justify-between border-2 border-white'>
   <div className='h-[90%]'>
    <h2 className='text-white'> Hello world</h2>
   </div>

   {broadcastMessages.map((message, index) => (
    <Messages key={index} {...message} />
   ))}

   <div className='h[10%]'>
    <InputMessage setMessage={setMessage} messageEmitter={sendMessage} />
   </div>
  </div>
 );
}
