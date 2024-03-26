import { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { cookies } from 'next/headers';
export const authOptions: AuthOptions = {
 providers: [
  GithubProvider({
   clientId: process.env.GITHUB_ID as string,
   clientSecret: process.env.GITHUB_SECRET as string,
  }),
 ],
 session: {
  maxAge: 30 * 24 * 60 * 60, // 30 days,
  strategy: 'jwt',
 },
 jwt: {
  maxAge: 30 * 24 * 60 * 60, // 30 days,$
 },
 cookies: {
  sessionToken: {
   name: `session`,
   options: {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: true,
   },
  },
 },
 secret: process.env.NEXTAUTH_SECRET,
 pages: {
  signIn: '/',
  error: 'signin',
 },

 events: {
  signOut() {
   cookies().delete('session')
  },
 },
};
