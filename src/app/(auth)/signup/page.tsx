import NextLink from 'next/link';
import { Metadata } from 'next';
import SignUpForm from '@/components/forms/signup-form';

export const metadata: Metadata = {
  title: 'Cadastre-se',
};

const SignUpPage = ({
  searchParams,
}: {
  searchParams?: {
    error?: string;
  };
}) => {
  const error = searchParams?.error;
  return (
    <div className="max-w-sm sm:w-96 mx-auto mt-8 p-6 bg-white rounded-md text-neutral-950">
      <h1 className="text-2xl font-semibold text-center">Crie uma conta</h1>

      <p className="text-neutral-600 text-center mt-2">
        Digite seu melhor email e uma senha segura
      </p>

      {error && (
        <p className="text-red-500 text-center text-xs mt-4">{error}</p>
      )}

      <SignUpForm />

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
