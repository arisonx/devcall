import { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { cookies } from 'next/headers';
export const authOptions: AuthOptions = {
 providers: [
  GithubProvider({
   clientId: process.env.GITHUB_ID as string,
   clientSecret: process.env.GITHUB_SECRET as string,
   httpOptions:{
    timeout: 20000,
   }
  }),
 ],
 session: {
  maxAge: 30 * 24 * 60 * 60, // 30 days,
  strategy: 'jwt',
 },
 jwt: {
  maxAge: 30 * 24 * 60 * 60, // 30 days,
 },
 cookies: {
  sessionToken: {
   name: `session`,
   options: {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: '/',
   },
  },
 },
 secret: process.env.NEXTAUTH_SECRET,
 pages: {
  signIn: '/',
  error: '/',
 },

 events: {
  signOut() {
   cookies().delete('session')
  },
 },
};
