import React from 'react';
import clsx from 'clsx';
import { Menu, Transition } from '@headlessui/react';
import { UserCircleIcon } from '@heroicons/react/outline';

const profileMenuItems = [
  { label: 'Your Profile', path: '/profile' },
  { label: 'Settings', path: '/settings' },
  { label: 'Logout', path: '/logout' },
];

const UserMenu = () => (
  <Menu as='div' className='relative ml-3'>
    {({ open }) => (
      <>
        <div>
          <Menu.Button className='flex items-center text-gray-400 hover:text-gray-500 bg-white rounded-full focus:outline-none focus:ring-smsoftware-blue focus:ring-offset-2 focus:ring-2'>
            <span className='sr-only'>Open user menu</span>
            <UserCircleIcon className='w-10 h-10 sm:w-8 sm:h-8' />
          </Menu.Button>
        </div>

        <Transition
          as={React.Fragment}
          show={open}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'>
          <Menu.Items
            className='absolute right-0 mt-2 py-1 w-48 bg-white rounded-md focus:outline-none shadow-lg origin-top-right ring-black ring-opacity-5 ring-1'
            static>
            {profileMenuItems.map(({ label, path }) => (
              <Menu.Item key={path}>
                {({ active }) => (
                  <a
                    href={path}
                    className={clsx('block px-4 py-2 text-gray-700 text-sm', {
                      'bg-gray-100': active,
                    })}>
                    {label}
                  </a>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </>
    )}
  </Menu>
);

export default UserMenu;
