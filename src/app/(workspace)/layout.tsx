import Header from '@/components/custom/header';
import { UserProvider } from '@/context/user-context';
import React from 'react';

const LayoutWorkspace = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <UserProvider>
      <Header />
      {children}
    </UserProvider>
  );
};

export default LayoutWorkspace;
