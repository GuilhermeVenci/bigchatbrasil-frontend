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
import { ClientType } from '@/types/client';

type ClientContextType = {
  client: ClientType | null;
  currentConsumption: number;
  getClientData: () => void;
};

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export const ClientProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const [client, setClient] = useState<ClientType | null>(null);
  const [currentConsumption, setCurrentConsumption] = useState<number>(0);

  const getClientData = useCallback(async () => {
    if (user) {
      try {
        const response = await apiRequest(`/clients/native/user/${user.id}`);
        if (response) {
          setClient(response);
          setCurrentConsumption(
            response.currentConsumption || response.current_consumption
          );
        }
      } catch (error: any) {
        console.log('CLIENTE NÃO CADASTRADO.', error);
      }
    }
  }, [user]);

  useEffect(() => {
    getClientData();
  }, [user, getClientData]);

  return (
    <ClientContext.Provider
      value={{ client, currentConsumption, getClientData }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export const useClient = () => {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error('useClient must be used within a ClientProvider');
  }
  return context;
};
