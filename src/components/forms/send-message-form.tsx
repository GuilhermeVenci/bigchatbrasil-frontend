'use client';
import { useState } from 'react';
import { cn } from '@/utils/cn';
import Button from '@/components/ui/button';
import PhoneInput from './inputs/phone-input';

const removePhoneFormatting = (phone: string) => {
  return phone.replace(/[^\d]/g, '');
};

const SendMessageForm = () => {
  const [phone, setPhone] = useState('');
  const [isWhatsApp, setIsWhatsApp] = useState(false);
  const [text, setText] = useState('');

  const handleSendMessage = async () => {
    const phoneCharacters = removePhoneFormatting(phone);

    if (isWhatsApp) {
      console.log({ whatsapp: { phone: phoneCharacters, text } });
    } else {
      console.log({ phone: phoneCharacters, text });
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Enviar Mensagem</h1>
      <div className="flex flex-row justify-between items-center gap-x-4">
        <PhoneInput
          id="phoneNumber"
          name="phoneNumber"
          label="Número de Telefone"
          placeholder="Número de Telefone"
          className="flex-1"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <div className="flex flex-row gap-x-4 h-[42px] mt-auto mb-[18px]">
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
        rows={10}
        className={cn(
          'mt-1 block w-full px-3 py-2 mb-4',
          'border border-neutral-300 rounded-md shadow-sm',
          'placeholder-neutral-400 sm:text-sm text-neutral-950',
          'focus:outline-none focus:ring-blue-500 focus:border-blue-500'
        )}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button onClick={handleSendMessage}>Enviar</Button>
    </div>
  );
};

export default SendMessageForm;
