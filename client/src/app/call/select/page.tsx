'use client';
import * as React from 'react';
import Image from 'next/image';
import { CiLogout } from 'react-icons/ci';
import { Button } from '@/components/ui/button';
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FaUserEdit } from 'react-icons/fa';
import { RxAvatar } from 'react-icons/rx';
import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogFooter,
 DialogHeader,
 DialogTitle,
 DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
 Form,
 FormControl,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from '@/components/ui/form';
import { IoVideocamOutline } from 'react-icons/io5';
import { IoMdArrowDropdown } from 'react-icons/io';
import { IoChatbubblesOutline } from 'react-icons/io5';
import { UserWithEditButton } from '@/components/UserWithEdit';

export default function NavigationMenuDemo() {
 const FormSchema = z.object({
  username: z.string().min(2, {
   message: 'nome não pode estar vazio',
  }),
  defaultAvatar: z.boolean().default(false).optional(),
 });

 const form = useForm<z.infer<typeof FormSchema>>({
  resolver: zodResolver(FormSchema),
  defaultValues: {
   username: '',
   defaultAvatar: false,
  },
 });

 async function onSubmit(data: z.infer<typeof FormSchema>) {}

 return (
  <main className='flex w-full flex-col items-center'>
   <header className='flex w-full justify-between px-8 py-4'>
    <Button
     className='w-30 flex items-center 
          gap-4 rounded-md border-[1px] border-blueborder bg-bluedarkbg px-4
          text-lg
          font-semibold text-white
          '
    >
     <CiLogout size={23} />
     Sair
    </Button>

    <DropdownMenu>
     <DropdownMenuTrigger className='flex items-center gap-4 rounded-lg border-[1px] border-blueborder bg-bluedarkbg px-4 py-2 text-[1.1rem] font-semibold text-white'>
      arisonreis
      <RxAvatar className='text-[1.6rem] font-bold' />
      <IoMdArrowDropdown className='text-blue-400' />
     </DropdownMenuTrigger>
     <DropdownMenuContent className='mt-[1px] border-[1px]'>
      <Dialog>
       <DialogTrigger asChild>
        <Button
         variant='outline'
         className='text-md flex items-center gap-4 px-7'
        >
         Editar perfil
         <FaUserEdit />
        </Button>
       </DialogTrigger>
       <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
         <DialogTitle className='text-md flex items-center gap-4'>
          Editar Pefil
         </DialogTitle>
         <DialogDescription>
          Altere as informações do seu perfil
         </DialogDescription>
        </DialogHeader>

        <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
           control={form.control}
           name='username'
           render={({ field }) => (
            <FormItem className='flex flex-col items-center'>
             <div className='flex w-full items-center gap-4'>
              <FormLabel htmlFor='name' className='text-right'>
               Nome
              </FormLabel>
              <FormControl className=''>
               <Input
                id='name'
                placeholder='johndoe'
                className='col-span-3'
                {...field}
               />
              </FormControl>
             </div>
             <FormMessage />
            </FormItem>
           )}
          />

          <FormField
           control={form.control}
           name='defaultAvatar'
           render={({ field }) => (
            <FormItem className='flex items-center gap-4 '>
             <FormLabel htmlFor='defaultAvatar'>Foto</FormLabel>

             <FormControl>
              <div className='flex w-full flex-col  gap-2'>
               <div className='flex flex-col items-center gap-2'>
                <div className='flex w-full items-center justify-center gap-6'>
                 <Input
                  type='file'
                  className='w-[24rem]]
                      block 
                      h-[4rem]
                      border-none bg-transparent text-sm
                      text-slate-500
                      file:mr-4 file:rounded-lg
                      file:border-0
                      file:bg-violet-50
                      file:px-4 file:py-2
                      file:text-sm file:font-semibold
                      file:text-gray-900
                      hover:file:bg-violet-100
                      '
                  name='image'
                  accept='image/*'
                 />
                </div>
               </div>
              </div>
             </FormControl>
             <FormMessage />
            </FormItem>
           )}
          />
          <DialogFooter className='pt-4'>
           <Button type='submit'>Salvar Alterações</Button>
          </DialogFooter>
         </form>
        </Form>
       </DialogContent>
      </Dialog>
     </DropdownMenuContent>
    </DropdownMenu>
   </header>

   <div className='flex h-full w-full flex-col items-center gap-8 py-8'>
    <div className='flex h-[350px] w-[500px] flex-col items-center rounded-2xl border-2 border-blueborder p-8'>
     <div className='flex h-full w-full items-center justify-center gap-4'>
      <Image src='/man.svg' alt='homem' width={200} height={200} />
      <Image src='/woman.svg' alt='mulher' width={200} height={200} />
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
  </main>
 );
}
