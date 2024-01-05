'use server';

import { cookies } from 'next/headers';

export async function DeleteUser() {
 const url = `${process.env.NEXT_PUBLIC_API_URL}/user/delete`;
 const cookiesStore = cookies();
 const token = cookies().get('devcall_auth');

 const deleteUser = await fetch(url, {
  headers: { Authorization: `Bearer ${token?.value}` },
  method: 'DELETE',
 });

 if (deleteUser.status === 200) {
  cookiesStore.delete('devcall_auth');
  return true;
 } else {
  return false;
 }
}
