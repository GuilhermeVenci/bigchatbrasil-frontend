import NextLink from 'next/link';
import { Metadata } from 'next';
import AuthActions from '../actions';
import TextInput from '@/components/ui/text-input';
import PasswordInput from '@/components/ui/password-input';
import PasswordConfirmInput from '@/components/custom/password-confirm-input';
import EmailInput from '@/components/custom/email-input';
import Button from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Cadastre-se',
};

const SignUpPage = () => {
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md text-neutral-950">
      <h1 className="text-2xl font-semibold text-center">Crie uma conta</h1>

      <p className="text-neutral-600 text-center mt-2">
        Digite seu melhor email e uma senha segura
      </p>

      <form action={AuthActions.signUp} className="mt-6 flex flex-col gap-y-5">
        <EmailInput label="Email" id="email" name="email" required />
        <PasswordConfirmInput className="-mt-4" />
        <Button>Cadastrar</Button>
      </form>

      <div className="flex items-center justify-center mt-6">
        <p className="text-sm text-neutral-600">
          Já possui uma conta?{' '}
          <NextLink href="/login" passHref legacyBehavior>
            <a className="text-blue-600 hover:text-blue-500">Entrar</a>
          </NextLink>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
