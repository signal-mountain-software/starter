import React from 'react';
import { useRecoilState } from 'recoil';
import clsx from 'clsx';
import { InformationCircleIcon } from '@heroicons/react/outline';

import iosPromptState from '../../states/iosPromptState';
import useIosPrompt from '../../hooks/useIosPrompt';
import useWebPrompt from '../../hooks/useWebPrompt';
import Alert from '../shared/Alert';
import ShareIcon from '../icons/Share';

const A2HS = () => {
  const [confirm, setConfirm] = React.useState(false);
  const [iosPrompt, setIosPrompt] = useRecoilState(iosPromptState);
  const [iosInstallPrompt, onIosDecline] = useIosPrompt();
  const [webInstallPrompt, onWebDecline, onWebInstall] = useWebPrompt();
  const buttonClasses = clsx(
    'text-sm font-medium rounded-md',
    'focus:ring-smsoftware-blue focus:ring-offset-smsoftware-blue-50 focus:outline-none focus:ring-offset-2 focus:ring-2'
  );

  const onDismiss = () => {
    setConfirm(true);
  };

  const onCancelDismiss = () => {
    setConfirm(false);
  };

  const onConfirmDismiss = () => {
    if (iosPrompt || iosInstallPrompt) {
      if (iosPrompt) {
        setIosPrompt(false);
      } else {
        onIosDecline();
      }
    } else {
      onWebDecline();
    }
    setConfirm(false);
  };

  if (!(iosPrompt || iosInstallPrompt || webInstallPrompt)) return null;

  return (
    <Alert show={!!(iosPrompt || iosInstallPrompt || webInstallPrompt)}>
      <div className='flex pt-8 sm:pt-6'>
        <div className='flex-shrink-0'>
          <InformationCircleIcon className='text-smsoftware-blue-400 w-5 h-5' />
        </div>

        <div className='flex-1 ml-3'>
          <h3 className='text-smsoftware-blue text-sm font-medium'>Install Available</h3>
          {(iosPrompt || iosInstallPrompt) && (
            <div className='text-smsoftware-blue mt-4 text-sm sm:mt-6'>
              <p className='block sm:hidden'>For iOS:</p>
              <div className='flex flex-1 items-center mt-2 space-x-1 sm:mt-0'>
                <div>
                  <p className='hidden sm:block'>For iOS, tap</p>
                  <p className='block sm:hidden'>Tap </p>
                </div>
                <ShareIcon className='w-6 h-6' />
                <p>then "Add to Home Screen"</p>
              </div>
            </div>
          )}
          <div className='mt-4'>
            <div className='flex items-center justify-end -mx-2 -my-1.5 space-x-2'>
              {confirm ? (
                <>
                  <h3 className='text-smsoftware-blue text-sm font-medium'>Are you sure?</h3>
                  <button
                    className={clsx('text-smsoftware-blue px-2 py-1.5 hover:bg-blue-50 bg-white', buttonClasses)}
                    onClick={onConfirmDismiss}>
                    Yes
                  </button>
                  <button
                    className={clsx('text-smsoftware-blue px-2 py-1.5 hover:bg-blue-50 bg-white', buttonClasses)}
                    onClick={onCancelDismiss}>
                    No
                  </button>
                </>
              ) : (
                <>
                  <button
                    className={clsx('px-2 py-1.5 text-gray-500 hover:bg-gray-100 bg-white', buttonClasses)}
                    onClick={onDismiss}>
                    Dismiss
                  </button>
                  {webInstallPrompt && (
                    <button
                      className={clsx('text-smsoftware-blue px-2 py-1.5 hover:bg-blue-50 bg-white', buttonClasses)}
                      onClick={onWebInstall}>
                      Install
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Alert>
  );
};

export default A2HS;
