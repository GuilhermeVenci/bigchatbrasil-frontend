import Header from '@/components/custom/header';
import React from 'react';

const LayoutWorkspace = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default LayoutWorkspace;
