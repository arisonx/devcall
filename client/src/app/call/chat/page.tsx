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
 const [messages, setMessages] = useState<messagesT[]>([]);
 const [isTyping, setIsTyping] = useState(false);
 const [userIsTyping, setUserIsTyping] = useState('');
 const [usersConnectedCount, setUsersConnectedCount] = useState(0);

 const { data } = useSession();
 const socketRef = useRef<Socket>();

 const sendMessage = () => {
  socketRef.current?.emit('message', message as string);
  setMessages((prev) => [
   ...prev,
   {
    from: socketRef.current?.id as string,
    payload: message as string,
   },
  ]);
 };

 const OnTypingEventEmitter = () => {
  socketRef.current?.emit('typing', data?.user?.name);
 };

 useEffect(() => {
  if (!socketRef.current) {
   socketRef.current = io('http://localhost:4000');
   socketRef.current?.on('message', (data: messagesT) => {
    console.log('received message:', data);
    setMessages((prevMessages) => [...prevMessages, data]);
   });

   socketRef.current?.on('users', (data) => {
    setUsersConnectedCount(data);
   });

   socketRef.current?.on('typing', (data: string) => {
    setUserIsTyping(data);
    setIsTyping(true);
    setTimeout(() => {
     setIsTyping(false);
    }, 1000);
   });
  }
 }, [messages]);

 return (
  <div className='flex h-full w-full flex-col items-center justify-between gap-5'>
   <Header />

   <ScrollArea className='flex h-full w-full flex-col'>
    {usersConnectedCount && (
     <p className='text-red-400'>usuários conectados: {usersConnectedCount}</p>
    )}

    {messages.map((message, index) => (
     <Messages key={index} {...message} />
    ))}
   </ScrollArea>

   <div className='flex w-full justify-center py-4'>
    <div className='h[10%] flex flex-col items-center'>
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
