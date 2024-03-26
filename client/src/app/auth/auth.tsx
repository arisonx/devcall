'use client';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PiArrowRightFill, PiArrowsClockwiseFill } from 'react-icons/pi';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import {
 Form,
 FormControl,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from '@/components/ui/form';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { RxAvatar } from 'react-icons/rx';
import { signIn, signOut } from 'next-auth/react';

import { useRouter } from 'next/navigation';

export function Home() {
 const [avatar, setAvatar] = useState('');
 const [dataError, setDataError] = useState(false);
 const [loading, setLoading] = useState(false);
 const [serverError, setServerError] = useState(false);

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

 async function onSubmit(data: z.infer<typeof FormSchema>) {
  if (!avatar && !data.defaultAvatar) {
   setDataError(true);
   setTimeout(() => {
    setDataError(false);
   }, 2500);
  } else {
   setLoading(true);

   try {
    const body = {
     name: data.username,
    };

    const url = process.env.NEXT_PUBLIC_API_URL + '/user/create';

    const createUserResponse = await fetch(url, {
     method: 'POST',
     body: JSON.stringify(body),
    });

    if (createUserResponse.status !== 201) {
     throw new Error('Failed to create user');
    }

    setLoading(false);
    router.push('/call/select');
   } catch (err) {
    setServerError(true);
    setLoading(true);
    setTimeout(() => {
     setServerError(false);
     setLoading(false);
    }, 2500);
   }
  }
 }

 return (
  <div className='flex w-[80%] flex-col gap-1'>
   <header className='w-100 h-[30%]'>
    <div className='flex items-center justify-center gap-3 pt-[6rem]'>
     <img
      src='/welcome.svg'
      className='w-12'
      alt='ícone de uma mão balançando simbolizando olá'
     />
     <h1 className='text-center text-xl font-medium text-white'>
      Bem vindo ao DevCall
     </h1>
    </div>
    <div className='flex items-center justify-center'>
     <p className='flex items-center gap-2 pt-7 text-white'>
      Conheça novas pessoas e troque mensagens com amigos em tempo real
      <img
       src='chaticon.svg'
       className='w-6'
       alt='ícone de um quadrado com pontinhos simbolizando uma caixa de mensagem'
      />
     </p>
    </div>

    <Separator className=' mt-5 bg-grayborder' />
   </header>

   <main className='h-[50%]'>
    {/*  <Form {...form}>
     <form
      onSubmit={form.handleSubmit(onSubmit)}
      className='flex w-[100%] flex-col items-center gap-12'
     > */}

    {/* !---Nome area---! */}

    {/* <FormField
       control={form.control}
       name='username'
       render={({ field }) => (
        <FormItem className='flex w-[100%] flex-col items-center pb-4'>
         <FormLabel className='pb-4 text-xl font-semibold text-white'>
          Informe o seu nome
         </FormLabel>
         <FormControl>
          <Input
           className='w-[31rem]'
           placeholder='digite seu nome'
           {...field}
          />
         </FormControl>
         <FormMessage />
        </FormItem>
       )}
      /> */}

    {/* !---- image profile ---! */}
    {/*  <FormField
       control={form.control}
       name='defaultAvatar'
       render={({ field }) => (
        <FormItem className='flex w-[100%] flex-col items-center'>
         <FormLabel className='pb-4 text-xl font-semibold text-white'>
          Insira uma foto de perfil
         </FormLabel>
         <FormControl>
          <div className='flex w-full flex-col  gap-2'>
           <div className='flex flex-col items-center gap-2'>
            <div className='flex w-full items-center justify-center gap-6'>
             <Input
              type='file'
              className='block
              h-[4rem] 
              w-[24rem]
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

             {avatar ? (
              <Avatar className='mb-4'>
               <AvatarImage src={avatar} alt='@shadcn' />
               <AvatarFallback>CN</AvatarFallback>
              </Avatar>
             ) : (
              <RxAvatar className='mb-4 h-10 w-10 text-white' />
             )}
            </div>

            <div className='flex items-center gap-2 pr-[22rem] text-white'>
             <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              color='white'
              className='border-white text-xl font-semibold'
             />
             <Label className='font-semibold' htmlFor='terms'>
              Padrão
             </Label>
            </div>
           </div>
          </div>
         </FormControl>
         <FormMessage />
        </FormItem>
       )}
      /> */}

    {/* !---SignInArea--- */}
    {/* <div className='flex w-[100%] items-center justify-center'>
       {!loading ? (
        <Button
         type='submit'
         className='flex w-[20rem] gap-2 border-2 border-grayborder  p-5 text-white'
        >
         Entrar
         <PiArrowRightFill className='text-xl text-white' />
        </Button>
       ) : (
        <Button disabled>
         <AiOutlineLoading3Quarters className='mr-2 h-4 w-4 animate-spin' />
         Please wait
        </Button>
       )}
      </div> */}
    {/* </form>
    </Form> */}

    <div className='ma-0 mx-auto mt-16 flex w-[100%] flex-col items-center'>
     <h2 className='text-center text-white'>Entre com sua conta</h2>

     <div className='mt-8 flex items-center gap-4 rounded-lg border-[0.1px] border-blue-950 px-20 py-10'>
      <Button variant='link'>
       <img
        src='googlelogo.svg'
        className='w-10'
        alt='logo colorida do google'
       />
      </Button>
      <Button
       variant='link'
       onClick={() => {
        signIn('github', {
         redirect: true,
         callbackUrl: '/call/select',
        });
       }}
      >
       <img
        src='githublogo.svg'
        className='w-10'
        alt='logo preta e branca do github'
       />
      </Button>
      <Button variant='link'>
       <img
        src='facebooklogo.svg'
        className='w-10'
        alt='logo azul e branca do facebook'
       />
      </Button>
     </div>
    </div>

    {/*   {dataError && (
     <Alert
      variant='destructive'
      className='absolute right-40 top-40 h-20 w-[70%] bg-bluedark'
     >
      <AlertCircle className='h-4 w-4' />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
       faça o upload de uma foto de perfil ou selecione a padrão
      </AlertDescription>
     </Alert>
    )} */}

    {/* {serverError && (
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
    )} */}
   </main>
  </div>
 );
}
