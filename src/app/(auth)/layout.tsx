import React, { ReactNode } from 'react';
import Image from 'next/image';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex flex-col lg:flex-row">
        <div className="max-lg:h-[15vh] flex lg:flex-1 bg-gray-200 relative items-center justify-center">
          <Image
            src="/images/bg-auth.jpg"
            alt="example image"
            fill
            sizes="100%"
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        <div className="flex-1 flex items-center justify-center bg-white max-sm:rounded-t-xl max-sm:-mt-[3vh] max-sm:z-10 max-sm:shadow-2xl">
          <div className="container px-4 pb-6 max-w-sm lg:max-w-none">
            <div className="flex flex-col items-center max-sm:-mt-[12vh]">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
