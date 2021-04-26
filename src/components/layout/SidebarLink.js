import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import { menuLink, menuLinkSelected } from './layout.module.css';

const SidebarLink = ({ label, path, Icon, iconProps, selected, onClick }) => (
  <Link
    className={clsx('group flex items-center px-3 py-2 text-lg font-medium rounded-md sm:text-base', {
      [menuLink]: !selected,
      [menuLinkSelected]: selected,
    })}
    to={path}
    onClick={onClick}>
    <Icon {...iconProps} aria-hidden='true' />
    {label}
  </Link>
);

SidebarLink.propTypes = {
  label: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  Icon: PropTypes.elementType,
  iconProps: PropTypes.shape({
    className: PropTypes.string,
  }),
  selected: PropTypes.bool,
  onClick: PropTypes.func,
};

SidebarLink.defaultProps = {
  selected: false,
  onClick: () => {
    console.log('SidebarLink onClick property not set');
  },
};

export default SidebarLink;
