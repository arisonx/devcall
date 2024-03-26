'use client';
import * as React from 'react';
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
import { IoMdArrowDropdown } from 'react-icons/io';
import { DeleteUser } from '../../../actions/deleteUser';
import { useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { signOut } from 'next-auth/react';
import { SessionData } from '../components/session/user';

interface IHeaderProps {
 username: string;
}

export const Header = ({ username }: IHeaderProps) => {
 const [requestError, setRequestError] = useState(false);
 const [buttonLogoutLoading, setButtonLogoutLoading] = useState(false);
 const [avatar, setAvatar] = useState('');

 const router = useRouter();

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

 /* const logout = async () => {
  setButtonLogoutLoading(true);

  const deleteUser = await DeleteUser();

  if (deleteUser) {
   setButtonLogoutLoading(!buttonLogoutLoading);
   router.push('/', {
    scroll: true,
   });
  } else {
   setButtonLogoutLoading(false);
   setRequestError(true);
   setTimeout(() => {
    setRequestError(false);
   }, 2500);
  }
 }; */

 return (
  <header className='flex w-full justify-between px-8 py-4'>
   {buttonLogoutLoading === true ? (
    <Button disabled className='flex items-center gap-4'>
     <AiOutlineLoading3Quarters className='w-30 flex animate-spin items-center' />
     Please wait
    </Button>
   ) : (
    <Button
     className='w-30 flex items-center 
    gap-4 rounded-md border-[1px] border-blueborder bg-bluedarkbg px-4
    text-lg
    font-semibold text-white
    '
     onClick={() => {
      signOut({
       redirect: true,
       callbackUrl: '/',
      });
     }}
    >
     <CiLogout size={23} />
     Sair
    </Button>
   )}

   <DropdownMenu>
    <DropdownMenuTrigger className='flex items-center gap-4 rounded-lg border-[1px] border-blueborder bg-bluedarkbg px-4 py-2 text-[1.1rem] font-semibold text-white'>
     <SessionData data='image' />

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
                 onChange={(event) => {
                  if (event.target.files) {
                   setAvatar(URL.createObjectURL(event.target.files[0]));
                  }
                 }}
                />
               </div>
              </div>
             </div>
            </FormControl>
            <FormMessage />
           </FormItem>
          )}
         />
         {avatar ? (
          <Avatar>
           <AvatarImage src={avatar} alt='@shadcn' />
           <AvatarFallback>CN</AvatarFallback>
          </Avatar>
         ) : (
          <RxAvatar className='mb-4 h-10 w-10 text-bluedark' />
         )}

         <DialogFooter className='pt-4'>
          <Button type='submit'>Salvar Alterações</Button>
         </DialogFooter>
        </form>
       </Form>
      </DialogContent>
     </Dialog>
    </DropdownMenuContent>
   </DropdownMenu>

   {requestError === true && (
    <Alert
     variant='destructive'
     className='absolute right-[15%] top-40 h-20 w-[70%] bg-bluedark'
    >
     <AlertCircle className='h-4 w-4' />
     <AlertTitle className='text-1xl font-bold'>Erro</AlertTitle>
     <AlertDescription className='text-[1rem]'>
      erro, tente novamente
     </AlertDescription>
    </Alert>
   )}
  </header>
 );
};
