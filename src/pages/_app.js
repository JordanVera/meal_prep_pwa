import '@/styles/globals.css';
import useServiceWorker from '../hooks/useServiceWorker';
import Sidebar from '@/components/Sidebar';

function MyApp({ Component, pageProps }) {
  useServiceWorker();

  return (
    <div className="flex min-h-screen bg-zinc-900">
      <Sidebar />

      <div className="flex-1">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
