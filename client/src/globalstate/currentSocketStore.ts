import { createStore } from 'zustand/vanilla';

export type state = {
 messages: Map<string, string>;
};

export type actions = {
 setMessageBroadcast: (messageReceived: message) => void;
};
export type message = {
 from: string;
 payload: string;
};


export type WebSocketStoreType = state & actions;

export const defaultInitialState: state = {
 messages: new Map(),
};

export const useWebSocketStore = (
 initialState: state = defaultInitialState
) => {
 return createStore<WebSocketStoreType>()((set) => ({
  ...initialState,

  setMessageBroadcast: (messageReceived: message) =>
   set((state) => ({
    messages: state.messages.set(messageReceived.from, messageReceived.payload),
   })),
 }));
};
