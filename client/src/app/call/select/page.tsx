"use client";
import * as React from "react";
import { CiLogout } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaUserEdit } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function NavigationMenuDemo() {
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
    alert(data);
  }

  return (
    <main className="w-full">
      <header className="flex justify-between border-2 border-white w-full px-8 py-4 ">
        <Button
          className="flex items-center gap-4 
          text-lg font-semibold text-white rounded-md w-30 px-4
          bg-bluedarkbg
          "
        >
          <CiLogout size={23} />
          Sair
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-4 text-[1.1rem] font-semibold text-white">
            arisonreis
            <RxAvatar className="text-[1.6rem] font-bold" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-4 text-md"
                >
                  Editar perfil
                  <FaUserEdit />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-4 text-md">
                    Edit profile
                  </DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem className="flex flex-col items-center">
                          <div className="flex items-center gap-4 w-full">
                            <FormLabel htmlFor="name" className="text-right">
                              Nome
                            </FormLabel>
                            <FormControl className="">
                              <Input
                                id="name"
                                placeholder="johndoe"
                                className="col-span-3"
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
                      name="defaultAvatar"
                      render={({ field }) => (
                        <FormItem className="flex items-center gap-4 ">
                          <FormLabel htmlFor="defaultAvatar">Foto</FormLabel>

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
                                  />
                                </div>
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <DialogFooter className="pt-4">
                      <Button type="submit">Salvar Alterações</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
    </main>
  );
}
