'use client';
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import apiRequest from '@/utils/api';
import { useUser } from '@/context/user-context';

type Message = {
  id: number;
  text: string;
  isWhatsApp: boolean;
};

type MessagesContextType = {
  messages: Message[];
  getMessages: () => void;
};

const MessagesContext = createContext<MessagesContextType | undefined>(
  undefined
);

export const MessagesProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);

  const getMessages = async () => {
    if (user) {
      try {
        const response = await apiRequest(`/messages/user/${user.id}`);
        setMessages(response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getMessages();
  }, [user]);

  return (
    <MessagesContext.Provider value={{ messages, getMessages }}>
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
