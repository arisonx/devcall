'use client';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';

export default function Video() {
 const [LocalStream, setLocalStream] = useState<MediaStream | null>(null);
 const videoRef = useRef<HTMLVideoElement>(null);

 const getMediaDevices = async () => {
  try {
   const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
   });
   setLocalStream(stream);
  } catch (error) {
   console.error('Error accessing media devices:', error);
  }
 };

 useEffect(() => {
  return () => {
   if (LocalStream && videoRef.current) {
    // Verifica se há uma stream local e se a ref de vídeo atual existe
    videoRef.current.srcObject = LocalStream; // Atribui a stream local ao vídeo
   }
  };
 }, [LocalStream]);

 return (
  <div>
   <h2 className='text-white'>video page</h2>
   <Button onClick={getMediaDevices}>pegue meus dispositivos de midia.</Button>

   {LocalStream && (
    <div>
     <video
      width='320'
      height='240'
      controls
      preload='none'
      autoPlay
      playsInline
      muted // Mutes the audio by default
      ref={videoRef} // Atribuindo a referência corretamente
     />
    </div>
   )}
  </div>
 );
}
