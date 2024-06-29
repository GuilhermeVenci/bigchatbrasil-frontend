import axios from 'axios';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const cookieMaxAge = 30 * 24 * 60 * 60;

const signIn = async (formData: FormData) => {
  'use server';

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const response = await axios.post(
      `${API_URL}/auth/login`,
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const { access_token: accessToken, role: userRole } = response.data;

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
  } catch (error) {
    return redirect(
      `/login?error=${encodeURIComponent(
        'Erro durante o login. Verifique o email e a senha.'
      )}`
    );
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

  try {
    const response = await axios.post(
      `${API_URL}/auth/register`,
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const { access_token: accessToken, role: userRole } = response.data;

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
  } catch (error) {
    return redirect(
      `/signup?error=${encodeURIComponent(
        'Erro no cadastro. Verifique se o email já está cadastrado.'
      )}`
    );
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
