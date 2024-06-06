'use client';
import { cn } from '@/utils/cn';
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Mensagens', href: '/messages' },
];

export default function Header() {
  const pathname = usePathname();
  const [currentItem, setCurrentItem] = useState('');

  useEffect(() => {
    const currentNavItem = navigation.find((item) => item.href === pathname);
    if (currentNavItem) {
      setCurrentItem(currentNavItem.name);
    }
  }, [pathname]);

  const handleNavItemClick = (name: string) => {
    setCurrentItem(name);
  };

  return (
    <header className="bg-white">
      <Popover as="nav">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-screen-2xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <PopoverButton className="relative inline-flex items-center justify-center rounded-md p-2 text-neutral-700 hover:bg-neutral-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </PopoverButton>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <Image
                      width={32}
                      height={32}
                      src="/vercel.svg"
                      alt="Your Company"
                      className="h-6 w-auto"
                      priority
                    />
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <NextLink
                          key={item.name}
                          href={item.href}
                          onClick={() => handleNavItemClick(item.name)}
                          className={cn(
                            'rounded-md px-3 py-2 text-md font-medium',
                            currentItem === item.name
                              ? 'text-blue-600 font-semibold'
                              : 'text-neutral-800 hover:text-neutral-400'
                          )}
                          aria-current={
                            currentItem === item.name ? 'page' : undefined
                          }
                        >
                          {item.name}
                        </NextLink>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className="relative rounded-full bg-neutral-800 p-1 text-neutral-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex rounded-full bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <Image
                          width={32}
                          height={32}
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt="Avatar"
                          className="h-8 w-8 rounded-full"
                        />
                      </MenuButton>
                    </div>
                    <Transition
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <MenuItem>
                          {({ focus }) => (
                            <a
                              href="#"
                              className={cn(
                                focus ? 'bg-neutral-100' : '',
                                'block px-4 py-2 text-sm text-neutral-700'
                              )}
                            >
                              Your Profile
                            </a>
                          )}
                        </MenuItem>
                        <MenuItem>
                          {({ focus }) => (
                            <a
                              href="#"
                              className={cn(
                                focus ? 'bg-neutral-100' : '',
                                'block px-4 py-2 text-sm text-neutral-700'
                              )}
                            >
                              Settings
                            </a>
                          )}
                        </MenuItem>
                        <MenuItem>
                          {({ focus }) => (
                            <a
                              href="#"
                              className={cn(
                                focus ? 'bg-neutral-100' : '',
                                'block px-4 py-2 text-sm text-neutral-700'
                              )}
                            >
                              Sign out
                            </a>
                          )}
                        </MenuItem>
                      </MenuItems>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <PopoverPanel className="sm:hidden absolute z-10 bg-white w-full">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <PopoverButton
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={cn(
                      currentItem === item.name
                        ? 'bg-neutral-300 text-neutral-900'
                        : 'text-neutral-900 hover:bg-neutral-300 hover:text-neutral-800',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={
                      currentItem === item.name ? 'page' : undefined
                    }
                  >
                    {item.name}
                  </PopoverButton>
                ))}
              </div>
            </PopoverPanel>
          </>
        )}
      </Popover>
    </header>
  );
}
