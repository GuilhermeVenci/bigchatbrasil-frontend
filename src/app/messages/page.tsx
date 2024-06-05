'use client';
import Button from '@/components/ui/button';
import { useState } from 'react';

const MessagesPage = () => {
  const [phone, setPhone] = useState('');
  const [isWhatsApp, setIsWhatsApp] = useState(false);
  const [text, setText] = useState('');

  const handleSendMessage = async () => {};

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Enviar Mensagem</h1>
      <input
        type="text"
        placeholder="Número de Telefone"
        className="mb-4 p-2 w-full border rounded"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <label className="mb-4 flex items-center">
        <input
          type="checkbox"
          checked={isWhatsApp}
          onChange={() => setIsWhatsApp(!isWhatsApp)}
          className="mr-2"
        />
        WhatsApp
      </label>
      <textarea
        placeholder="Texto da Mensagem"
        className="mb-4 p-2 w-full border rounded"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button onClick={handleSendMessage}>Enviar</Button>
    </div>
  );
};

export default MessagesPage;
