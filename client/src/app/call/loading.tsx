import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
 return (
  <section className='flex h-screen w-screen flex-row items-center gap-6'>
   <Skeleton className='h-full w-[120px]' />
   <div className='flex h-full flex-1 flex-col gap-6 px-4'>
    <Skeleton className='h-[190px] w-full' />
    <Skeleton className='h-[190px] w-full' />
    <Skeleton className='h-[190px] w-full' />
    <Skeleton className='h-[190px] w-full' />
    <Skeleton className='h-[190px] w-full' />
   </div>
  </section>
 );
}
