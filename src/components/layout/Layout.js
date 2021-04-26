import React from 'react';
import PropTypes from 'prop-types';

import A2HS from '../alerts/A2HS';
import SWUpdate from '../alerts/SWUpdate';
import Sidebar from './Sidebar';

const Layout = ({ children, metadata }) => (
  <>
    <Sidebar title={metadata.title}>{children}</Sidebar>
    <A2HS />
    <SWUpdate />
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  metadata: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default Layout;
