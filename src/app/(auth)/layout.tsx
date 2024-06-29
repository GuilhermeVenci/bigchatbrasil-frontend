'use client';
import React, { ReactNode } from 'react';
import Image from 'next/image';
import { BackgroundBeams } from '@/components/custom/background-beams';
import Lottie from 'lottie-react';
import SendAnimation from '@/assets/send-animation.json';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex flex-col lg:flex-row">
        <div className="max-lg:h-[15vh] flex lg:flex-1 bg-green-500/50 relative items-center justify-center">
          <BackgroundBeams />
          <Lottie
            animationData={SendAnimation}
            style={{ width: '100%', maxWidth: '70vw' }}
          />
        </div>
        <div className="flex-1 flex items-center justify-center bg-white max-sm:rounded-t-xl max-sm:-mt-[3vh] z-10 max-sm:shadow-2xl">
          <div className="container px-4 pb-6 max-w-sm lg:max-w-none">
            <div className="flex flex-col items-center max-sm:-mt-[12vh]">
              <Image
                width={40}
                height={40}
                src="/brand-icon.svg"
                alt="Icon Company"
                className="h-32 sm:h-40 w-auto -mt-10 max-sm:-mt-4"
                priority
              />
              <div className="-mt-16 max-sm:-mt-16">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
