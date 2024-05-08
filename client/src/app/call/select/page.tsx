import * as React from 'react';
import { Main } from './components/main';
import { Header } from './components/header';

export default async function NavigationMenuDemo() {
 return (
  <div className='align-center flex h-full w-full flex-col'>
   <Header />

   <Main />
  </div>
 );
}
