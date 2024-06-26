import '@/styles/globals.css';
import useServiceWorker from '../hooks/useServiceWorker';
import Sidebar from '@/components/Sidebar';
import { UserProvider } from '@/providers/UserContext';
import AddRecipe_FromWebsite from '@/components/modals/AddRecipe_FromWebsite';
import AddRecipe from '@/components/modals/AddRecipe';

function MyApp({ Component, pageProps }) {
  useServiceWorker();

  return (
    <UserProvider>
      <div className="flex min-h-screen bg-zinc-900">
        <Sidebar />

        <div className="flex-1">
          <Component {...pageProps} />

          <AddRecipe />
          <AddRecipe_FromWebsite />
        </div>
      </div>
    </UserProvider>
  );
}

export default MyApp;
