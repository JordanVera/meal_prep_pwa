import { useState, useEffect } from 'react';
import SignupForm from '@/components/SignupForm';
import LoginForm from '@/components/LoginForm';
import { showSuccessToast } from '@/utils/toasts';
import { useRouter } from 'next/router';

export default function Home() {
  const [isSignupOrLogin, setIsSignupOrLogin] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (router.query.signedOut) {
      showSuccessToast('You have been signed out');
      // Remove the query parameter from the URL
      router.replace('/', undefined, { shallow: true });
    }

    if (router.query.signup) {
      setIsSignupOrLogin(false);
    }
  }, [router.query]);

  return (
    <div className="bg-zinc-900 flex flex-col items-center justify-center min-h-screen">
      {isSignupOrLogin ? (
        <LoginForm setIsSignupOrLogin={setIsSignupOrLogin} />
      ) : (
        <SignupForm setIsSignupOrLogin={setIsSignupOrLogin} />
      )}
    </div>
  );
}
