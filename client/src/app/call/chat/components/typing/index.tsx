interface ITyping {
 username: string | null | undefined;
}
export function Typing({ username }: ITyping) {
 return (
  <p className='text-start text-sm text-zinc-200'>
   {username} está digitando...
  </p>
 );
}
