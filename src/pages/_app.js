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
import GenerateMealPlanModal from '@/components/modals/GenerateMealPlanModal';
import { useUser } from '@/providers/UserContext';
import SignupBanner from '@/components/banners/SignupBanner';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  useServiceWorker();

  return (
    <SessionProvider session={session}>
      <UserProvider>
        <div className="flex h-screen relative">
          <Sidebar />

          <div className="flex-1 overflow-auto bg-zinc-900">
            <Component {...pageProps} />

            <GenerateMealPlanModal />
            <AddRecipe />
            <AddRecipe_FromWebsite />
          </div>
        </div>
        <SignupBanner />

        <ToastContainer />
      </UserProvider>
    </SessionProvider>
  );
}

export default MyApp;
