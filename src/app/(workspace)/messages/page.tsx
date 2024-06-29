'use client';
import MessageList from '@/components/custom/message-list';
import SendMessageForm from '@/components/forms/send-message-form';
import { useClient } from '@/context/client-context';
import { ClientType } from '@/types/client';

const formatCurrency = (value: number, locale = 'pt-BR', currency = 'BRL') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const MessagesPage = ({ client }: { client: ClientType }) => {
  const { currentConsumption } = useClient();
  const planPre = client?.plan === 'PREPAID';
  const balance = client
    ? planPre
      ? client.credits ?? 0
      : currentConsumption ?? 0
    : 0;

  return (
    <div className="flex flex-col w-full lg:flex-row gap-8 pb-16">
      <div className="flex flex-col w-full items-center">
        <div className="flex flex-col pt-4 pb-10 w-full max-w-xl">
          <h1 className="text-3xl font-semibold leading-tight">
            {client?.name}
          </h1>
          <div className="mb-2">
            <span>Seu saldo é </span>
            <span className="font-semibold">{formatCurrency(balance)}</span>
          </div>
          <span className="w-fit px-1.5 py-1 rounded-lg bg-blue-300 text-neutral-800 font-semibold text-sm">
            {planPre ? 'Pré-pago' : 'Pós-pago'}
          </span>
        </div>
        <SendMessageForm clientId={client.id} />
      </div>
      <MessageList />
    </div>
  );
};

export default MessagesPage;
