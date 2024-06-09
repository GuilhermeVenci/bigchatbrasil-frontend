'use client';
import { useState } from 'react';
import { cn } from '@/utils/cn';
import Button from '@/components/ui/button';
import PhoneInput from './inputs/phone-input';
import apiRequest from '@/utils/api';

const removePhoneFormatting = (phone: string) => {
  return phone.replace(/[^\d]/g, '');
};

const SendMessageForm = ({
  clientId,
  onMessageSent,
}: {
  clientId: number;
  onMessageSent: () => void;
}) => {
  const [phone, setPhone] = useState('');
  const [isWhatsApp, setIsWhatsApp] = useState(false);
  const [text, setText] = useState('');
  const [error, setError] = useState(false);

  const handleSendMessage = async () => {
    setError(false);
    const phoneCharacters = removePhoneFormatting(phone);
    const values = {
      clientId,
      phoneNumber: phoneCharacters,
      isWhatsApp,
      text,
      sentAt: new Date().toISOString(),
    };

    if (values.text && values.phoneNumber) {
      await apiRequest('/messages/', 'POST', values);
    } else {
      setError(true);
    }
    onMessageSent();
  };

  return (
    <div className="container mx-auto max-sm:p-4 max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Enviar Mensagem</h1>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-x-4">
        <PhoneInput
          id="phoneNumber"
          name="phoneNumber"
          label="Número de Telefone"
          placeholder="Número de Telefone"
          className="flex-1 max-sm:w-full"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <div className="max-sm:w-full flex flex-row max-sm:justify-around sm:gap-x-4 h-[42px] mt-auto mb-[18px]">
          <label className="flex items-center font-semibold">
            <input
              type="radio"
              name="contactMethod"
              value="sms"
              checked={!isWhatsApp}
              onChange={() => setIsWhatsApp(false)}
              className="size-4 mr-2"
            />
            SMS
          </label>
          <label className="flex items-center font-semibold">
            <input
              type="radio"
              name="contactMethod"
              value="whatsapp"
              checked={isWhatsApp}
              onChange={() => setIsWhatsApp(true)}
              className="size-4 mr-2"
            />
            WhatsApp
          </label>
        </div>
      </div>

      <textarea
        id="message"
        placeholder="Texto da Mensagem"
        rows={6}
        className={cn(
          'mt-1 block w-full px-3 py-2',
          'border border-neutral-300 rounded-md shadow-sm',
          'placeholder-neutral-400 sm:text-sm text-neutral-950',
          'focus:outline-none focus:ring-blue-500 focus:border-blue-500'
        )}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {error ? (
        <span className="text-xs text-red-600">
          Preencha todos os campos para enviar a mensagem
        </span>
      ) : (
        <></>
      )}
      <Button onClick={handleSendMessage} className="mt-4">
        Enviar
      </Button>
    </div>
  );
};

export default SendMessageForm;
