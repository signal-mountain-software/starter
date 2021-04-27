import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Dialog, Transition } from '@headlessui/react';
import { BellIcon, MenuAlt2Icon, XIcon } from '@heroicons/react/outline';

import SidebarLinks from './SidebarLinks';
import UserMenu from './UserMenu';
import { navbarHeight } from './layout.module.css';

const Sidebar = ({ children, title }) => {
  const [open, setOpen] = React.useState(false);

  const closeMenu = () => {
    setOpen(false);
  };

  const openMenu = () => {
    setOpen(true);
  };

  return (
    <div className='flex h-screen bg-gray-100 overflow-hidden'>
      {/* off-canvas menu for mobile clients */}
      <Transition.Root as={React.Fragment} show={open}>
        <Dialog as='div' className='fixed z-40 inset-0 flex md:hidden' open={open} onClose={setOpen} static>
          <Transition.Child
            as={React.Fragment}
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <Dialog.Overlay className='fixed inset-0 bg-gray-600 bg-opacity-75' />
          </Transition.Child>

          <Transition.Child
            as={React.Fragment}
            enter='transition ease-in-out duration-300 transform'
            enterFrom='-translate-x-full'
            enterTo='translate-x-0'
            leave='transition ease-in-out duration-300 transform'
            leaveFrom='translate-x-0'
            leaveTo='-translate-x-full'>
            <div className='relative flex flex-1 flex-col pb-4 w-full max-w-xs bg-gradient-to-b from-smsoftware-blue to-smsoftware-blue-700'>
              <Transition.Child
                as={React.Fragment}
                enter='ease-in-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in-out duration-300'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'>
                <div className='absolute right-0 top-0 -mr-12 pt-2'>
                  <button
                    className='flex items-center justify-center ml-1 w-10 h-10 rounded-full focus:outline-none focus:ring-white focus:ring-2 focus:ring-inset'
                    type='button'
                    onClick={closeMenu}>
                    <span className='sr-only'>Close sidebar</span>
                    <XIcon className='w-8 h-8 text-white sm:w-6 sm:h-6' aria-hidden='true' />
                  </button>
                </div>
              </Transition.Child>

              <SidebarLinks title={title} />
            </div>
          </Transition.Child>

          <div className='flex-shrink-0 w-14' aria-hidden='true'>
            {/* dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* static sidebar for desktop clients */}
      <div className='hidden bg-gradient-to-b from-smsoftware-blue to-smsoftware-blue-700 md:flex md:flex-shrink-0'>
        <div className='flex flex-col w-64'>
          <div className='flex flex-col flex-grow pb-4 overflow-y-auto'>
            <SidebarLinks title={title} />
          </div>
        </div>
      </div>

      {/* container for main content */}
      <div className='flex flex-1 flex-col w-0 overflow-hidden'>
        <div className={clsx('relative z-10 flex flex-shrink-0 bg-white shadow', navbarHeight)}>
          <button
            className='px-4 text-gray-500 border-r border-gray-200 focus:outline-none focus:ring-smsoftware-blue focus:ring-2 focus:ring-inset md:hidden'
            type='button'
            onClick={openMenu}>
            <span className='sr-only'>Open sidebar</span>
            <MenuAlt2Icon className='w-8 h-8 sm:w-6 sm:h-6' aria-hidden='true' />
          </button>

          <div className='flex flex-1 justify-between px-4'>
            <div className='flex flex-1 items-center'>
              <h1 className='hidden ml-2 text-2xl font-semibold sm:block md:hidden'>{title}</h1>
            </div>

            <div className='flex items-center ml-4 md:ml-6'>
              <button
                className='p-1 text-gray-400 hover:text-gray-500 bg-white rounded-full focus:outline-none focus:ring-smsoftware-blue focus:ring-offset-2 focus:ring-2'
                type='button'>
                <span className='sr-only'>View notifications</span>
                <BellIcon className='w-8 h-8 sm:w-6 sm:h-6' aria-hidden='true' />
              </button>

              <UserMenu />
            </div>
          </div>
        </div>

        <main className='relative flex-1 focus:outline-none overflow-y-auto'>
          <div className='mx-auto px-2 max-w-7xl sm:px-6 lg:px-8'>{children}</div>
        </main>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default Sidebar;
