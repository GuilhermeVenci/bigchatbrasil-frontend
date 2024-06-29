import NextLink from 'next/link';
import AuthActions from '@/app/(auth)/actions';
import TextInput from '@/components/ui/text-input';
import Button from '@/components/ui/button';
import PasswordInput from './inputs/password-input';

const LoginForm = () => {
  return (
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

      <div className="flex items-center justify-center mt-1">
        <NextLink href="/forgot-password" passHref legacyBehavior>
          <a className="text-sm text-blue-600 hover:text-blue-500">
            Esqueceu a senha?
          </a>
        </NextLink>
      </div>
      <Button className="w-full">Entrar</Button>
    </form>
  );
};

export default LoginForm;
