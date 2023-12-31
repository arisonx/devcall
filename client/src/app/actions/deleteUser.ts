'use server';

import { cookies } from 'next/headers';
import { Dispatch } from 'react';


export async function DeleteUser() {
 const url = `${process.env.NEXT_PUBLIC_API_URL}/user/delete`;
 const token = cookies().get('devcall_auth');

 try {
  await fetch(url, {
   headers: { Authorization: `Bearer ${token?.value}` },
   method: 'DELETE',
  });

  
 } catch (err) {

 }
}
