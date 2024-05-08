import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSession } from 'next-auth/react';
import { Suspense } from 'react';

interface props {
 data: string;
}

export function SessionData({ data }: props) {
 const session = useSession();

 return (
  <div>
   {data === 'name' && <p className='text-slate-200 text-sm'>{session.data?.user?.name}</p>}
   {data === 'image' && (
    <Avatar className='h-8 w-8 border-[2px] border-b-blueviolet border-l-yellow-300  border-r-emerald-700 border-t-orange-800'>
     <Suspense fallback={<p className='text-white'>carregando....</p>}>
      <AvatarImage src={session.data?.user?.image as string} />
     </Suspense>
    </Avatar>
   )}
   {data === 'email' && session.data?.user?.email}
  </div>
 );
}
