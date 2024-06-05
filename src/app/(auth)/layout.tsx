import React, { ReactNode } from 'react';
import Image from 'next/image';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex flex-col lg:flex-row">
        <div className="hidden lg:flex lg:flex-1 bg-gray-200 relative items-center justify-center">
          <Image
            src="/images/bg-auth.webp"
            alt="example image"
            fill
            sizes="100%"
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        <div className="flex-1 flex items-center justify-center bg-white">
          <div className="container px-4 pb-6 max-w-sm lg:max-w-none">
            <div className="flex flex-col items-center">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
