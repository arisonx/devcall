'use client';

interface IMessage {
 from: string;
 payload: string;
}

export function Messages({ from, payload }: IMessage) {
 return (
  <div>
   <p className='text-white'>Message received from {from}</p>
   <p className='text-white'>Message: {payload}</p>
  </div>
 );
}
