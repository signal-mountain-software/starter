import React from 'react';
import PropTypes from 'prop-types';
import { StaticImage } from 'gatsby-plugin-image';
import { Transition } from '@headlessui/react';

const Alert = ({ children, show }) => (
  <div className='fixed z-50 bottom-0 flex justify-center w-full sm:pb-4'>
    <Transition
      as={React.Fragment}
      show={show}
      enter='transition duration-100 ease-in-out'
      enterFrom='transform-gpu translate-y-1/4 opacity-0'
      enterTo='transform-gpu translate-y-0 opacity-100'
      leave='transition duration-75 ease-in-out'
      leaveFrom='transform-gpu translate-y-0 opacity-100'
      leaveTo='transform-gpu translate-y-1/4 opacity-0'>
      <div className='relative flex-1 p-4 bg-white rounded-none sm:max-w-screen-sm sm:rounded-lg sm:shadow-lg'>
        <div className='absolute -top-6 inset-x-0 flex justify-center'>
          <StaticImage
            src='../../images/smsoftware-icon.png'
            alt='Signal Mountain Software'
            placeholder='blurred'
            quality={100}
            formats={['AUTO', 'PNG']}
            layout='fixed'
            width={64}
          />
        </div>
        {children}
      </div>
    </Transition>
  </div>
);

Alert.propTypes = {
  children: PropTypes.node.isRequired,
  show: PropTypes.bool.isRequired,
};

export default Alert;
