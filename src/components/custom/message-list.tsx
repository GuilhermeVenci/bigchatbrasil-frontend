'use client';
import { cn } from '@/utils/cn';
import { useMessages } from '@/context/messages-context';
import React from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const MessageList = () => {
  const { messages } = useMessages();

  const formatPhoneNumber = (phoneNumber: string) => {
    if (!phoneNumber) return phoneNumber;
    const phoneNumberDigits = phoneNumber.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumberDigits.length;

    if (phoneNumberLength < 3) return phoneNumberDigits;
    if (phoneNumberLength < 8) {
      return `(${phoneNumberDigits.slice(0, 2)}) ${phoneNumberDigits.slice(2)}`;
    }
    return `(${phoneNumberDigits.slice(0, 2)}) ${phoneNumberDigits.slice(
      2,
      7
    )}-${phoneNumberDigits.slice(7, 11)}`;
  };

  return (
    <div className="flex flex-col max-w-xl w-full mx-auto">
      <ul
        role="list"
        className="w-full flex max-lg:flex-col-reverse lg:flex-wrap-reverse gap-4"
      >
        {!!messages && messages.length > 0 ? (
          messages.map((message: any) => (
            <li
              key={message?.id}
              className="min-w-60 flex flex-col justify-between p-4 bg-white rounded-xl shadow-sm gap-y-2"
            >
              <div className="w-fit rounded-lg">
                <div className=" flex flex-row gap-x-2  ">
                  <span
                    className={cn(
                      'w-fit h-fit px-2 py-1 text-xs font-bold rounded text-white',
                      message?.isWhatsApp ? 'bg-green-600' : 'bg-cyan-600'
                    )}
                  >
                    {message?.isWhatsApp ? 'WhatsApp' : 'SMS'}
                  </span>
                  <span className="font-medium">
                    {formatPhoneNumber(message?.phoneNumber)}
                  </span>
                </div>
                <span className="text-xs font-semibold">
                  Enviado{' '}
                  {formatDistanceToNow(parseISO(message?.sentAt), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </span>
              </div>
              <div
                className="flex-1 max-h-44 overflow-y-scroll bg-neutral-100 rounded-md p-4 text-sm scrollbar-hide"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >
                <p className="break-words">{message?.text}</p>
              </div>
            </li>
          ))
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
};

export default MessageList;
