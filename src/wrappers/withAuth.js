import React from 'react';
import Amplify, { Analytics, Auth } from 'aws-amplify';
import { useRecoilState } from 'recoil';

import authenticatedState from '../states/authenticatedState';
import userState from '../states/userState';

Analytics.configure({ disabled: true });
Amplify.configure({
  Auth: {
    identityPoolId: process.env.COGNITO_IDENTITY_POOL,
    region: process.env.COGNITO_REGION || 'us-east-1',
    userPoolId: process.env.COGNITO_USER_POOL_ID,
    userPoolWebClientId: process.env.COGNITO_USER_POOL_WEB_CLIENT_ID,
  },
  ssr: true,
});

const withAuth = Component => props => {
  const [authenticated, setAuthenticated] = useRecoilState(authenticatedState);
  const [user, setUser] = useRecoilState(userState);
  const setAuthenticatedStable = React.useCallback(setAuthenticated, [setAuthenticated]);
  const setUserStable = React.useCallback(setUser, [setUser]);

  React.useEffect(() => {
    let mounted = true;

    Auth.currentAuthenticatedUser()
      .then(user => {
        if (process.env.NODE_ENV === 'development') {
          console.log(user);
        }
        if (mounted && user) {
          setAuthenticatedStable(true);
          setUserStable(user);
        }
      })
      .catch(error => {
        if (process.env.NODE_ENV === 'development') {
          console.error(error);
        }
        setAuthenticatedStable(false);
        setUserStable(null);

        const redirectUrl = window.location.origin;
        window.open(`${process.env.THESEUS_URL}?redirectUrl=${encodeURIComponent(redirectUrl)}`, '_self');
      });

    return () => {
      mounted = false;
    };
  }, [setAuthenticatedStable, setUserStable]);

  if (!authenticated) {
    return null;
  }

  return <Component {...props} user={user} />;
};

export default withAuth;
