import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Dialog, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuAlt2Icon, UserCircleIcon, XIcon } from '@heroicons/react/outline';

import SidebarLinks from './SidebarLinks';
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
            <div className='from-smsoftware-blue to-smsoftware-blue-700 relative flex flex-1 flex-col pb-4 pt-5 w-full max-w-xs bg-gradient-to-b'>
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
                    <XIcon className='w-6 h-6 text-white' aria-hidden='true' />
                  </button>
                </div>
              </Transition.Child>

              <SidebarLinks title={title} closeMenu={closeMenu} />
            </div>
          </Transition.Child>

          <div className='flex-shrink-0 w-14' aria-hidden='true'>
            {/* dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* static sidebar for desktop clients */}
      <div className='from-smsoftware-blue to-smsoftware-blue-700 hidden bg-gradient-to-b md:flex md:flex-shrink-0'>
        <div className='flex flex-col w-64'>
          <div className='flex flex-col flex-grow pb-4 pt-5 overflow-y-auto'>
            <SidebarLinks title={title} closeMenu={closeMenu} />
          </div>
        </div>
      </div>

      {/* container for main content */}
      <div className='flex flex-1 flex-col w-0 overflow-hidden'>
        <div className={clsx('relative z-10 flex flex-shrink-0 bg-white shadow', navbarHeight)}>
          <button
            className='focus:ring-smsoftware-blue px-4 text-gray-500 border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset md:hidden'
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
                className='focus:ring-smsoftware-blue p-1 text-gray-400 hover:text-gray-500 bg-white rounded-full focus:outline-none focus:ring-offset-2 focus:ring-2'
                type='button'>
                <span className='sr-only'>View notifications</span>
                <BellIcon className='w-8 h-8 sm:w-6 sm:h-6' aria-hidden='true' />
              </button>

              {/* profile dropdown */}
              <Menu as='div' className='relative ml-3'>
                {({ open }) => (
                  <>
                    <div>
                      <Menu.Button className='focus:ring-smsoftware-blue flex items-center text-gray-400 hover:text-gray-500 bg-white rounded-full focus:outline-none focus:ring-offset-2 focus:ring-2'>
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
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href='/'
                              className={clsx('block px-4 py-2 text-gray-700 text-sm', {
                                'bg-gray-100': active,
                              })}>
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href='/'
                              className={clsx('block px-4 py-2 text-gray-700 text-sm', {
                                'bg-gray-100': active,
                              })}>
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href='/'
                              className={clsx('block px-4 py-2 text-gray-700 text-sm', {
                                'bg-gray-100': active,
                              })}>
                              Sign Out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </>
                )}
              </Menu>
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
