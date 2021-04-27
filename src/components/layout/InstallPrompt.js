import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import clsx from 'clsx';
import { DownloadIcon } from '@heroicons/react/outline';

import iosPromptState from '../../states/iosPromptState';
import promptState from '../../states/promptState';
import useIosCheck from '../../hooks/useIosCheck';

const InstallPrompt = () => {
  const [prompt, setPrompt] = useRecoilState(promptState);
  const setIosPrompt = useSetRecoilState(iosPromptState);
  const isIOS = useIosCheck();
  const iconClasses = 'mr-4 w-8 h-8 sm:w-6 sm:h-6 text-smsoftware-blue-200';
  const installClasses = clsx(
    'inline-flex items-center -my-1 px-5 py-3 w-full',
    'text-smsoftware-blue-50 hover:text-white text-lg font-medium sm:text-base',
    'hover:bg-smsoftware-blue bg-transparent border border-transparent',
    'focus:outline-none focus:ring-smsoftware-blue-300 focus:ring-offset-smsoftware-blue-50 focus:ring-offset-2 focus:ring-2'
  );

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

  if (process.env.NODE_ENV === 'development') return null;

  return isIOS ? (
    <>
      <div className='mb-4 mt-5 w-full border-t-2 border-dashed border-smsoftware-blue-200' />
      <button className={installClasses} onClick={onInstallClick}>
        <DownloadIcon className={iconClasses} />
        Install Available
      </button>
    </>
  ) : (
    <div className='block standalone:hidden'>
      <div className='mb-4 mt-5 w-full border-t-2 border-dashed border-smsoftware-blue-200' />
      <button className={installClasses} onClick={onInstallClick}>
        <DownloadIcon className={iconClasses} />
        Install Available
      </button>
    </div>
  );
};

export default InstallPrompt;
