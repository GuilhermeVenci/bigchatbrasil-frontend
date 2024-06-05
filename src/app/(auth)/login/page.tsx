import NextLink from 'next/link';
import { Metadata } from 'next';
import AuthActions from '../actions';
import PasswordInput from '@/components/ui/password-input';
import TextInput from '@/components/ui/text-input';
import Button from '@/components/ui/button';

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

      <form action={AuthActions.signIn} className="mt-6 flex flex-col gap-y-5">
        <TextInput
          label="Email"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />

        <PasswordInput id="password" name="password" label="Senha" />

        <div className="flex items-center justify-center">
          <NextLink href="/forgot-password" passHref legacyBehavior>
            <a className="text-sm text-blue-600 hover:text-blue-500">
              Esqueceu a senha?
            </a>
          </NextLink>
        </div>
        <Button>Entrar</Button>
      </form>

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
