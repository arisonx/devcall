import { useEffect, useState } from 'react';
import { SocketGateway } from '@/gateways/websocket';


interface IMessagesBroadcast {
 currentSocket: SocketGateway;
}

export function Messages({ currentSocket }: IMessagesBroadcast) {
 const [messageBroadcast, setMessageBroadcast] = useState<
  Map<string, string> | undefined
 >();


 useEffect(() => {
  currentSocket?.listenBroadcast();
 }, []);

 return (
  <div>
   {messageBroadcast &&
    Array.from(messageBroadcast).map((item, index) => {
     return (
      <div key={index}>
       <p className=''> message received from {item}</p>
      </div>
     );
    })}
  </div>
 );
}
