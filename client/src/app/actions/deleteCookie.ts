'use server';
import { cookies } from 'next/headers';

interface IDeleteProps {
 cookie_name: string;
}

export async function delete_cookie({ cookie_name }: IDeleteProps) {
 cookies().delete(cookie_name);
}
