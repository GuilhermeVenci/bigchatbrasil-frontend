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

type Client = {
  id: number;
  userId: number;
  plan: string;
  limit?: number;
  credits?: number;
  currentConsumption?: number;
  phone: string;
  name: string;
  cpf: string;
  cnpj: string;
  companyName: string;
};

type ClientContextType = {
  client: Client | null;
  currentConsumption: number;
  getClientData: () => void;
};

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export const ClientProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const [client, setClient] = useState<Client | null>(null);
  const [currentConsumption, setCurrentConsumption] = useState<number>(0);

  const getClientData = async () => {
    if (user) {
      try {
        const response = await apiRequest(`/clients/user/${user.id}`);
        if (response) {
          setClient(response);
          setCurrentConsumption(response.currentConsumption);
        }
      } catch (error) {
        console.error('Failed to fetch client:', error);
      }
    }
  };

  useEffect(() => {
    getClientData();
  }, [user]);

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
