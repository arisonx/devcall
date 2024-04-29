import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function InputMessage() {
 return (
  <div className='flex items-center justify-center gap-2 py-2'>
   <Input className='w-[20rem]' />
   <Button>Enviar</Button>
  </div>
 );
}
