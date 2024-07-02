// pages/_app.js
import '@/styles/globals.css';
import useServiceWorker from '../hooks/useServiceWorker';
import Sidebar from '@/components/Sidebar';
import { UserProvider } from '@/providers/UserContext';
import AddRecipe_FromWebsite from '@/components/modals/AddRecipe_FromWebsite';
import AddRecipe from '@/components/modals/AddRecipe';
import { SessionProvider } from 'next-auth/react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  useServiceWorker();

  return (
    <SessionProvider session={session}>
      <UserProvider>
        <div className="flex min-h-screen bg-zinc-900">
          <Sidebar />
          <div className="flex-1">
            <Component {...pageProps} />
            <AddRecipe />
            <AddRecipe_FromWebsite />
          </div>
        </div>
        <ToastContainer />
      </UserProvider>
    </SessionProvider>
  );
}

export default MyApp;
