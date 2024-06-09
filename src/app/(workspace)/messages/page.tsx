'use client';
import MessageList from '@/components/custom/message-list';
import SendMessageForm from '@/components/forms/send-message-form';
import { useMessages } from '@/context/messages-context';

const MessagesPage = ({ clientId }: { clientId: number }) => {
  const { getMessages } = useMessages();

  return (
    <div className="flex flex-col lg:flex-row gap-8 pb-16">
      <SendMessageForm clientId={clientId} onMessageSent={getMessages} />
      <MessageList />
    </div>
  );
};

export default MessagesPage;
