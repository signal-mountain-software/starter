import React from 'react';
import { useRecoilState } from 'recoil';
import PropTypes from 'prop-types';
import { StaticImage } from 'gatsby-plugin-image';
import { CubeTransparentIcon, HomeIcon } from '@heroicons/react/outline';

import pageState from '../../states/pageState';
import InstallPrompt from './InstallPrompt';
import SidebarLink from './SidebarLink';

const links = [
  { label: 'Home', path: '/', icon: HomeIcon },
  { label: 'Example', path: '/example', icon: CubeTransparentIcon },
];

const SidebarLinks = ({ title }) => {
  const [page, setPage] = useRecoilState(pageState);
  const iconClasses = 'mr-4 w-8 h-8 sm:w-6 sm:h-6 text-smsoftware-blue-200';

  const onLinkClick = path => () => {
    setPage(path);
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
          {links.map(({ label, path, icon }) => (
            <SidebarLink
              key={path}
              label={label}
              path={path}
              Icon={icon}
              iconProps={{ className: iconClasses }}
              selected={page === path}
              onClick={onLinkClick(path)}
            />
          ))}
        </nav>
      </div>
      <InstallPrompt />
    </>
  );
};

SidebarLinks.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SidebarLinks;
