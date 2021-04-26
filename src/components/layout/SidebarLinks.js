import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { StaticImage } from 'gatsby-plugin-image';
import { CubeTransparentIcon, DownloadIcon, HomeIcon } from '@heroicons/react/outline';

import iosPromptState from '../../states/iosPromptState';
import pageState from '../../states/pageState';
import promptState from '../../states/promptState';
import useIosCheck from '../../hooks/useIosCheck';
import SidebarLink from './SidebarLink';

const SidebarLinks = ({ title, closeMenu }) => {
  const [page, setPage] = useRecoilState(pageState);
  const [prompt, setPrompt] = useRecoilState(promptState);
  const setIosPrompt = useSetRecoilState(iosPromptState);
  const isIOS = useIosCheck();
  const iconClasses = 'mr-4 w-8 h-8 sm:w-6 sm:h-6 text-smsoftware-blue-200';
  const installClasses = clsx(
    'inline-flex items-center -my-1 px-5 py-3 w-full',
    'text-smsoftware-blue-50 hover:text-white text-lg font-medium sm:text-base',
    'hover:bg-smsoftware-blue bg-transparent border border-transparent',
    'focus:ring-smsoftware-blue-300 focus:ring-offset-smsoftware-blue-50 focus:outline-none focus:ring-offset-2 focus:ring-2'
  );

  const onLinkClick = path => () => {
    closeMenu();
    setPage(path);
  };

  const onInstallClick = () => {
    if (isIOS) {
      setIosPrompt(true);
    } else {
      // show native prompt
      prompt.prompt();

      // decide what to do after the user chooses
      prompt.userChoice.then(choice => {
        if (choice.outcome === 'accepted') {
          setPrompt(null);
        }
      });
    }
  };

  return (
    <>
      <div className='flex flex-shrink-0 items-center px-4'>
        <StaticImage
          src='../../images/smsoftware-icon.png'
          alt='Signal Mountain Software'
          placeholder='blurred'
          quality={100}
          formats={['AUTO', 'PNG']}
          layout='fixed'
          width={32}
        />
        <h1 className='ml-2 text-white text-xl font-semibold'>{title}</h1>
      </div>
      <div className='flex-1 mt-5 h-0 overflow-y-auto'>
        <nav className='px-2 space-y-2'>
          <SidebarLink
            label='Home'
            path='/'
            Icon={HomeIcon}
            iconProps={{ className: iconClasses }}
            selected={page === '/'}
            onClick={onLinkClick('/')}
          />
          <SidebarLink
            label='Example'
            path='/example'
            Icon={CubeTransparentIcon}
            iconProps={{ className: iconClasses }}
            selected={page === '/example'}
            onClick={onLinkClick('/example')}
          />
        </nav>
      </div>
      {isIOS ? (
        <>
          <div className='border-smsoftware-blue-200 mb-4 mt-5 w-full border-t-2 border-dashed' />
          <button className={installClasses} onClick={onInstallClick}>
            <DownloadIcon className={iconClasses} />
            Install Available
          </button>
        </>
      ) : (
        <div className='block standalone:hidden'>
          <div className='border-smsoftware-blue-200 mb-4 mt-5 w-full border-t-2 border-dashed' />
          <button className={installClasses} onClick={onInstallClick}>
            <DownloadIcon className={iconClasses} />
            Install Available
          </button>
        </div>
      )}
    </>
  );
};

SidebarLinks.propTypes = {
  title: PropTypes.string.isRequired,
  closeMenu: PropTypes.func.isRequired,
};

export default SidebarLinks;
