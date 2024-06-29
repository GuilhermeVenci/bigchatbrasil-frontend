'use client';
import ClientForm from '@/components/forms/client-form';
import { useUser } from '@/context/user-context';
import { MessagesProvider } from '@/context/messages-context';
import { useEffect, useState } from 'react';
import MessagesPage from './page';
import apiRequest from '@/utils/api';
import LoadingMessages from './loading';
import { ClientProvider } from '@/context/client-context';
import { ClientType } from '@/types/client';

const MessagesLayout = () => {
  const { user } = useUser();
  const [client, setClient] = useState<ClientType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyClient = async () => {
      if (user) {
        try {
          const clientResponse: any = await apiRequest(
            '/clients/native/user/' + user?.id
          );

          if (clientResponse && clientResponse.id) {
            setClient(clientResponse);
          } else {
            setClient(null);
          }
        } catch (error) {
          setClient(null);
        } finally {
          setLoading(false);
        }
      }
    };

    verifyClient();
  }, [user]);

  const handleClientCreated = (newClient: ClientType) => {
    setClient(newClient);
  };

  return (
    <ClientProvider>
      <MessagesProvider>
        <div className="p-6 sm:p-12">
          {loading ? (
            <LoadingMessages />
          ) : client ? (
            <MessagesPage client={client} />
          ) : (
            <ClientForm onClientCreated={handleClientCreated} />
          )}
        </div>
      </MessagesProvider>
    </ClientProvider>
  );
};

export default MessagesLayout;
