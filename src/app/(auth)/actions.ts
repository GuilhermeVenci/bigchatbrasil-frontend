import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const cookieMaxAge = 30 * 24 * 60 * 60;

const signIn = async (formData: FormData) => {
  'use server';

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  let accessToken;
  let userRole;

  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    return redirect(
      `/login?error=${encodeURIComponent(
        'Erro durante o login. Verifique o email e a senha.'
      )}`
    );
  }

  const data = await response.json();
  accessToken = data.access_token;
  userRole = data.role;

  if (!accessToken) {
    return redirect(
      `/login?error=${encodeURIComponent('Nenhum token de acesso recebido')}`
    );
  }

  cookies().set('token', accessToken, {
    maxAge: cookieMaxAge,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
  });

  if (userRole === 'CLIENT') {
    return redirect('/messages');
  } else {
    return redirect('/dashboard');
  }
};

const signUp = async (formData: FormData) => {
  'use server';
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const passwordConfirm = formData.get('passwordConfirm') as string;

  if (password !== passwordConfirm) {
    return redirect(
      '/signup?error=' + encodeURIComponent('Senhas não coincidem')
    );
  }

  let accessToken;
  let userRole;

  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    return redirect(
      `/signup?error=${encodeURIComponent(
        'Erro no cadastro. Verifique se o email já está cadastrado.'
      )}`
    );
  }

  const data = await response.json();
  accessToken = data.access_token;
  userRole = data.role;

  if (!accessToken) {
    return redirect(
      `/signup?error=${encodeURIComponent('Nenhum token de acesso recebido')}`
    );
  }

  cookies().set('token', accessToken, {
    maxAge: cookieMaxAge,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
  });

  if (userRole === 'CLIENT') {
    return redirect('/messages');
  } else {
    return redirect('/dashboard');
  }
};

const logout = async () => {
  cookies().set('token', '', {
    maxAge: -1,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
  });

  return redirect('/login');
};

const AuthActions = {
  signIn,
  signUp,
  logout,
};

export default AuthActions;
