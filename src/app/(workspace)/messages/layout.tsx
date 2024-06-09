'use client';
import ClientForm from '@/components/forms/client-form';
import { useUser } from '@/context/user-context';
import { MessagesProvider } from '@/context/messages-context';
import { Suspense, useEffect, useState } from 'react';
import MessagesPage from './page';
import apiRequest from '@/utils/api';
import LoadingMessages from './loading';

type ClientType = {
  id: number;
  name: string;
  plan: string;
};

const MessagesLayout = () => {
  const { user } = useUser();
  const [client, setClient] = useState<ClientType>();

  useEffect(() => {
    const verifyClient = async () => {
      if (user) {
        try {
          const clientResponse: any = await apiRequest(
            '/clients/user/' + user?.id
          );
          if (clientResponse && clientResponse.id) {
            setClient(clientResponse);
          }
        } catch (error) {
          console.error('Failed to fetch client:', error);
        }
      }
    };

    verifyClient();
  }, [user]);

  const handleClientCreated = (newClient: ClientType) => {
    setClient(newClient);
  };

  return (
    <MessagesProvider>
      <Suspense fallback={<LoadingMessages />}>
        <div className="p-6 sm:p-12">
          {client ? (
            <MessagesPage clientId={client.id} />
          ) : (
            <ClientForm onClientCreated={handleClientCreated} />
          )}
        </div>
      </Suspense>
    </MessagesProvider>
  );
};

export default MessagesLayout;
