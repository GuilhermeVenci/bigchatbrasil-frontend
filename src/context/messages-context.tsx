'use client';
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from 'react';
import apiRequest from '@/utils/api';
import { useUser } from '@/context/user-context';
import { useClient } from './client-context';
import { Message } from '@/types/messages';

type MessagesContextType = {
  messages: Message[];
  getMessages: () => void;
  sendMessage: (values: any) => Promise<void>;
};

const MessagesContext = createContext<MessagesContextType | undefined>(
  undefined
);

export const MessagesProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const { client, getClientData } = useClient();
  const [messages, setMessages] = useState<Message[]>([]);

  const getMessages = useCallback(async () => {
    if (user) {
      try {
        const response = await apiRequest(`/messages/user/${user.id}`);
        setMessages(response);
      } catch (error) {
        console.log(error);
      }
    }
  }, [user]);

  const sendMessage = async (values: any) => {
    try {
      await apiRequest('/messages/', 'POST', values);
      await getMessages();
      await getClientData();
    } catch (error) {
      console.log('Failed to send message:', error);
    }
  };

  useEffect(() => {
    getMessages();
  }, [user, getMessages]);

  return (
    <MessagesContext.Provider value={{ messages, getMessages, sendMessage }}>
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessagesContext);
  if (context === undefined) {
    throw new Error('useMessages must be used within a MessagesProvider');
  }
  return context;
};
