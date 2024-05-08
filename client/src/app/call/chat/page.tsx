'use client';
import { InputMessage } from './components/input';
import { useEffect, useRef, useState } from 'react';
import { Messages } from './components/messages';
import { io, Socket } from 'socket.io-client';
import { Header } from '@/app/call/select/components/header';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSession } from 'next-auth/react';
import { Typing } from './components/typing';

export default function Chat() {
 type messagesT = {
  from: string;
  payload: string;
 };

 const [message, setMessage] = useState<string | undefined>();
 const [broadcastMessages, setBroadcastMessages] = useState<messagesT[]>([]);
 const [isTyping, setIsTyping] = useState(false);
 const [userIsTyping, setUserIsTyping] = useState('');

 const { data } = useSession();
 const socketRef = useRef<Socket>();

 const sendMessage = () => {
  socketRef.current?.emit('message', message as string);
 };

 const OnTypingEventEmitter = () => {
  socketRef.current?.emit('typing', data?.user?.name);
 };

 useEffect(() => {
  if (!socketRef.current) {
   socketRef.current = io('http://localhost:4000');
   socketRef.current?.on('message', (data: messagesT) => {
    setBroadcastMessages((prevMessages) => [...prevMessages, data]);
   });

   socketRef.current?.on('typing', (data: string) => {
    setUserIsTyping(data);
    setIsTyping(true);
    setTimeout(() => {
     setIsTyping(false);
    }, 1000);
   });
  }
 }, [broadcastMessages]);

 return (
  <div className='flex h-full w-full flex-col items-center justify-between gap-5 border-2 border-white'>
   <Header />

   <ScrollArea className='flex h-full flex-col gap-4'>
    {broadcastMessages.map((message, index) => (
     <Messages key={index} {...message} />
    ))}
   </ScrollArea>

   <div className='flex w-full justify-center py-4'>
    <div className='h[10%] flex w-[50%] flex-col items-start'>
     {isTyping && <Typing username={userIsTyping as string} />}
     <InputMessage
      TipyingEventEmitter={OnTypingEventEmitter}
      setMessage={setMessage}
      messageEmitter={sendMessage}
     />
    </div>
   </div>
  </div>
 );
}
