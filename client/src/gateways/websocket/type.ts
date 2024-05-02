export type MessageBroadcastType = {
    from:string
    payload:string
}

export type SocketInitializationType = {
    autoConnect?: boolean;
}

export interface WebSocketGateway {
 startConnection:({autoConnect}:SocketInitializationType)=> void;
 emitMessage: (message: string) => void;
 getMessagesBroadcast: () => void
}
