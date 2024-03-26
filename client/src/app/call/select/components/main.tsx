import { Button } from '@/components/ui/button';
import { IoChatbubblesOutline, IoVideocamOutline } from 'react-icons/io5';
import Image from 'next/image';

export function Main() {
 return (
  <div className='flex h-full w-full flex-col items-center gap-8 py-8'>
   <div className='flex h-[350px] w-[500px] flex-col items-center rounded-2xl border-2 border-blueborder p-8'>
    <div className='flex h-full w-full items-center justify-center gap-4'>
     <Image
      quality={100}
      blurDataURL='/woman.svg'
      placeholder='blur'
      src='/man.svg'
      alt='homem'
      width={200}
      height={200}
     />

     <Image
      quality={100}
      blurDataURL='/woman.svg'
      placeholder='blur'
      src='/woman.svg'
      alt='mulher'
      width={200}
      height={200}
     />
    </div>

    <Button
     variant={'outline'}
     className='flex items-center gap-4 border-[1px] border-blueborder bg-transparent text-white'
    >
     VIDEO CALL
     <IoVideocamOutline />
    </Button>
   </div>

   <div className='flex h-[350px] w-[500px] items-center justify-center gap-6 rounded-2xl border-2 border-blueborder p-4'>
    <Button
     variant={'outline'}
     className='flex items-center gap-4 border-[1px] border-blueborder bg-transparent text-white'
    >
     CHAT
     <IoChatbubblesOutline />
    </Button>
   </div>
  </div>
 );
}
