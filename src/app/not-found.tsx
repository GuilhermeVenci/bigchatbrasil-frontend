import NextLink from 'next/link';
import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="w-dvw h-dvh flex flex-col items-center justify-center gap-y-4">
      <span className="text-4xl font-semibold text-neutral-800">
        Página não encontrada
      </span>{' '}
      <span className="text-lg font-normal text-neutral-700">
        Verique o endereço do link que você acessou ou volte para a tela inicial
      </span>
      <NextLink href="/" className="text-lg font-medium text-blue-600">
        Voltar á pagina inicial &rarr;
      </NextLink>
    </div>
  );
};

export default NotFoundPage;
