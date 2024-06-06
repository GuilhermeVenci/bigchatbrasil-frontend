import NextLink from 'next/link';
import { Metadata } from 'next';
import LoginForm from '@/components/forms/login-form';

export const metadata: Metadata = {
  title: 'Acesse sua conta',
};

const LoginPage = () => {
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md text-neutral-950">
      <h1 className="text-2xl font-semibold text-center">Acesse sua conta</h1>

      <p className="text-neutral-600 text-center mt-2">
        Selecione o método de login que preferir
      </p>

      <LoginForm />

      {/* <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-600">
            ou acesse com uma conta
          </span>
        </div>
      </div> */}

      <div className="flex items-center justify-center mt-6">
        <p className="text-sm text-gray-600">
          Não possui uma conta?{' '}
          <NextLink href="/signup" passHref legacyBehavior>
            <a className="text-blue-600 hover:text-blue-500">Cadastre-se</a>
          </NextLink>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
