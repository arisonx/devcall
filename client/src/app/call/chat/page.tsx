'use client';
import { SocketConnect } from '@/lib/websocket';
import { InputMessage } from './components/input';

export default function Chat() {

    
 return (
  <div className='flex h-full w-full flex-col justify-between border-2 border-white'>
   <div className='h-[90%]'>
    <h2 className='text-white'> Hello world</h2>
   </div>

   <div className='h[10%]'>
    <InputMessage />
   </div>
  </div>
 );
}
