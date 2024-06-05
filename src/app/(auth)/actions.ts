import { redirect } from 'next/navigation';

const signIn = async (formData: FormData) => {
  'use server';

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  console.log({ email, password });

  return redirect('/dashboard');
};

const signUp = async (formData: FormData) => {
  'use server';

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const passwordConfirm = formData.get('password') as string;

  console.log({ email, password, passwordConfirm });

  return redirect('/dashboard');
};

const AuthActions = {
  signIn,
  signUp,
};

export default AuthActions;
