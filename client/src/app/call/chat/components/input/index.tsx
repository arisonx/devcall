import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dispatch, SetStateAction } from 'react';

interface InputMessageSetMessage {
 setMessage: Dispatch<SetStateAction<string | undefined>>;
 messageEmitter: ()=> void
}
export function InputMessage({ setMessage, messageEmitter }: InputMessageSetMessage) {
 return (
  <div className='flex items-center justify-center gap-2 py-2'>
   <Input
    className='w-[20rem]'
    onChange={(e) => setMessage(e.target.value as string)}
   />
   <Button onClick={messageEmitter} >Enviar</Button>
  </div>
 );
}
