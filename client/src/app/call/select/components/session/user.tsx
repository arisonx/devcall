import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSession } from 'next-auth/react';
import { Suspense } from 'react';

interface props {
 data: string;
}

export function SessionData({ data }: props) {
 const session = useSession();

 return (
  <p>
   {data === 'name' && session.data?.user?.name}
   {data === 'image' && (
    <Avatar className='h-12 w-12 border-[2px] border-b-blueviolet border-l-yellow-300  border-r-emerald-700 border-t-orange-800'>
     <Suspense fallback={<p className='text-white'>carregando....</p>}>
      <AvatarImage src={session.data?.user?.image as string} />
     </Suspense>
    </Avatar>
   )}
   {data === 'email' && session.data?.user?.email}
  </p>
 );
}
