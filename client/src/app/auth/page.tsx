"use client";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PiArrowRightFill, PiArrowsClockwiseFill } from "react-icons/pi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RxAvatar } from "react-icons/rx";
import { useRouter } from "next/navigation";

export function Home() {
  const [avatar, setAvatar] = useState("");
  const [dataError, setDataError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  const router =  useRouter();

  const FormSchema = z.object({
    username: z.string().min(2, {
      message: "nome não pode estar vazio",
    }),
    defaultAvatar: z.boolean().default(false).optional(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
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

        const url = process.env.NEXT_PUBLIC_API_URL + "/user/create";

        const createUserResponse = await fetch(url, {
          method: "POST",
          body: JSON.stringify(body),
        })

        if (createUserResponse.status !== 201) {
          throw new Error("Failed to create user");
        }

        setLoading(false);
        router.push("/chat/select")

        
      } catch (err) {
        setServerError(true);
        setLoading(true);
        setTimeout(() => {
          setServerError(false);
        }, 2500);
      }
    }
  }

  return (
    <div className="w-[80%] flex flex-col gap-1">
      <header className="h-[30%] w-100">
        <div className="flex items-center justify-center pt-[6rem] gap-3">
          <img
            src="/welcome.svg"
            className="w-12"
            alt="ícone de uma mão balançando simbolizando olá"
          />
          <h1 className="text-white text-center font-medium text-xl">
            Bem vindo ao DevCall
          </h1>
        </div>
        <div className="flex items-center justify-center">
          <p className="text-white gap-2 pt-7 flex items-center">
            Conheça novas pessoas e troque mensagens com amigos em tempo real
            <img
              src="chaticon.svg"
              className="w-6"
              alt="ícone de um quadrado com pontinhos simbolizando uma caixa de mensagem"
            />
          </p>
        </div>

        <Separator className=" bg-grayborder mt-5" />
      </header>

      <main className="h-[50%]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-[100%] items-center flex-col gap-12"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center pb-4 w-[100%]">
                  <FormLabel className="text-white text-xl pb-4 font-semibold">
                    Informe o seu nome
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-[31rem]"
                      placeholder="digite seu nome"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="defaultAvatar"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center w-[100%]">
                  <FormLabel className="text-white text-xl pb-4 font-semibold">
                    Insira uma foto de perfil
                  </FormLabel>
                  <FormControl>
                    <div className="flex flex-col gap-2  w-full">
                      <div className="flex items-center gap-2 flex-col">
                        <div className="w-full justify-center gap-6 flex items-center">
                          <Input
                            type="file"
                            className="w-[24rem]
                          h-[4rem] 
                          border-none
                          block text-sm text-slate-500
                          file:mr-4
                          file:rounded-lg file:border-0
                          file:px-4
                          file:py-2
                          file:text-sm file:font-semibold
                          file:bg-violet-50 file:text-gray-900
                          hover:file:bg-violet-100
                          bg-transparent
                          "
                            name="image"
                            accept="image/*"
                            onChange={(event) => {
                              if (event.target.files) {
                                setAvatar(
                                  URL.createObjectURL(event.target.files[0])
                                );
                              }
                            }}
                          />

                          {avatar ? (
                            <Avatar className="mb-4">
                              <AvatarImage src={avatar} alt="@shadcn" />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                          ) : (
                            <RxAvatar className="w-10 h-10 text-white mb-4" />
                          )}
                        </div>

                        <div className="flex gap-2 items-center text-white pr-[22rem]">
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            color="white"
                            className="border-white font-semibold text-xl"
                          />
                          <Label className="font-semibold" htmlFor="terms">
                            Padrão
                          </Label>
                        </div>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-center w-[100%]">
              {!loading ? (
                <Button
                  type="submit"
                  className="w-[20rem] text-white p-5 flex gap-2  border-2 border-grayborder"
                >
                  Entrar
                  <PiArrowRightFill className="text-xl text-white" />
                </Button>
              ) : (
                <Button disabled>
                  <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              )}
            </div>
          </form>
        </Form>

        <div className="w-[100%] mt-16 flex ma-0 mx-auto flex-col items-center">
          <h2 className="text-white text-center">OU</h2>
          <Separator className="bg-grayborder w-80 mt-6 mb-4" />

          <div className="flex items-center gap-4 mt-4">
            <Button variant="link">
              <img
                src="googlelogo.svg"
                className="w-10"
                alt="logo colorida do google"
              />
            </Button>
            <Button variant="link">
              <img
                src="githublogo.svg"
                className="w-10"
                alt="logo preta e branca do github"
              />
            </Button>
            <Button variant="link">
              <img
                src="facebooklogo.svg"
                className="w-10"
                alt="logo azul e branca do facebook"
              />
            </Button>
          </div>
        </div>

        {dataError && (
          <Alert
            variant="destructive"
            className="absolute right-40 top-40 w-[70%] h-20 bg-bluedark"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              faça o upload de uma foto de perfil ou selecione a padrão
            </AlertDescription>
          </Alert>
        )}

        {serverError && (
          <Alert
            variant="destructive"
            className="absolute right-40 top-40 w-[70%] h-20 bg-bluedark"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>error, tente novamente</AlertDescription>
          </Alert>
        )}
      </main>
    </div>
  );
}
