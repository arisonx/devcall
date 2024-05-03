'use client';
import { type ReactNode, createContext, useRef, useContext } from 'react';
import { type StoreApi, useStore } from 'zustand';

import {
 useWebSocketStore,
 type WebSocketStoreType,
} from '@/globalstate/currentSocketStore';

export const WebSocketStoreContext =
 createContext<StoreApi<WebSocketStoreType> | null>(null);

export interface WebSocketStoreProviderProps {
 children: ReactNode;
}

export const WebsocketStoreProvider = ({
 children,
}: WebSocketStoreProviderProps) => {
 const storeRef = useRef<StoreApi<WebSocketStoreType>>();
 if (!storeRef.current) {
  storeRef.current = useWebSocketStore();
 }

 return (
  <WebSocketStoreContext.Provider value={storeRef.current}>
   {children}
  </WebSocketStoreContext.Provider>
 );
};

export const WebSocketStore = <T,>(
 selector: (store: WebSocketStoreType) => T
): T => {
 const webSocketStoreContext = useContext(WebSocketStoreContext);

 if (!webSocketStoreContext) {
  throw new Error(`useCounterStore must be use within CounterStoreProvider`);
 }

 return useStore(webSocketStoreContext, selector);
};
