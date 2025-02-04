// pages/_app.js
import '@/styles/globals.css';
import useServiceWorker from '../hooks/useServiceWorker';

import { UserProvider } from '@/providers/UserContext';
import { SessionProvider } from 'next-auth/react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './_layout';

import SignupBanner from '@/components/banners/SignupBanner';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  useServiceWorker();

  return (
    <SessionProvider session={session}>
      <UserProvider>
        <Layout Component={Component} pageProps={pageProps} />

        <SignupBanner />

        <ToastContainer />
      </UserProvider>
    </SessionProvider>
  );
}

export default MyApp;
