import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Big Chat Brasil',
  description: 'Plataforma de envio de SMS e mensagens',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <header>
          <nav className="bg-blue-500 p-4 text-white">
            <div className="container mx-auto">Big Chat Brasil</div>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="bg-blue-500 p-4 text-white mt-4">
          <div className="container mx-auto">© 2024 Big Chat Brasil</div>
        </footer>
      </body>
    </html>
  );
}
