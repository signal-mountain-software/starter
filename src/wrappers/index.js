import React from 'react';
import { compose } from '../util';
import Layout from '../components/layout/Layout';
import Root from '../components/Root';
import withAuth from './withAuth';
import withRecoil from './withRecoil';
import withSiteMetadata from './withSiteMetadata';

const EnhancedRoot = compose(withRecoil)(Root);
const EnhancedLayout = compose(withAuth, withSiteMetadata)(Layout);

export const _wrapRootElement = ({ element }) => <EnhancedRoot>{element}</EnhancedRoot>;
export const _wrapPageElement = ({ element, props }) => <EnhancedLayout {...props}>{element}</EnhancedLayout>;
