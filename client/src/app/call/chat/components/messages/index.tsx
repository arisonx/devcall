'use client';

import {
 Card,
 CardContent,
 CardFooter,
 CardHeader,
 CardTitle,
} from '@/components/ui/card';
import { IoIosTimer } from 'react-icons/io';
import { CiHeart } from 'react-icons/ci';
import { SessionData } from '@/app/call/select/components/session/user';
import { Button } from '@/components/ui/button';
import { IoIosMore } from 'react-icons/io';
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuRadioGroup,
 DropdownMenuRadioItem,
 DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';

interface IMessage {
 from: string;
 payload: string;
}

export function Messages({ from, payload }: IMessage) {
 const [position, setPosition] = useState('top');

 return (
  <div className='flex w-full items-center justify-center'>
   <Card className='relative w-[90%] border-[1px] border-bluedarkprimary bg-bluedark'>
    <CardHeader className='py-4'>
     <CardTitle className='flex items-center justify-between'>
      <div className='flex items-center gap-2'>
       <SessionData data='image' />
       <SessionData data='name' />
       <span className='flex items-center gap-1'>
        <IoIosTimer className='text-slate-300' size={16} />
        <p className='text-xs text-slate-300'>
         {new Date().getHours()}:{new Date().getMinutes()}
        </p>
       </span>
      </div>
      <DropdownMenu modal>
       <DropdownMenuTrigger asChild>
        <Button variant='link' className='h-[10px] w-20 p-0 py-0'>
         <IoIosMore size={20} className='font-bold text-white' />
        </Button>
       </DropdownMenuTrigger>
       <DropdownMenuContent
        className='bg-transparente border-[1px] border-black
       p-0 py-2 text-white
       '
       >
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
         <DropdownMenuRadioItem value='top'>Top</DropdownMenuRadioItem>
         <DropdownMenuRadioItem value='bottom'>Bottom</DropdownMenuRadioItem>
         <DropdownMenuRadioItem value='right'>Right</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
       </DropdownMenuContent>
      </DropdownMenu>
     </CardTitle>
    </CardHeader>
    <CardContent className='py-8'>
     <p className='text-base font-semibold text-slate-300'>{payload}</p>
    </CardContent>
    {/* <Button className='p-0' variant='ghost'>
      <CiHeart size={20} className='text-slate-300' />
     </Button> */}
   </Card>
  </div>
 );
}
