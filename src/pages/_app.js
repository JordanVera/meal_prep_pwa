import '@/styles/globals.css';
import useServiceWorker from '../hooks/useServiceWorker';

function MyApp({ Component, pageProps }) {
  useServiceWorker();

  return <Component {...pageProps} />;
}

export default MyApp;
