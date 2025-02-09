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

      router.replace('/', undefined, { shallow: true });
    }

    if (router.query.signup) {
      setIsSignupOrLogin(false);
    }
  }, [router.query]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-zinc-900/80 bg-[url('/photos/meal.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/80" />
      <div className="z-10 ">
        {isSignupOrLogin ? (
          <LoginForm setIsSignupOrLogin={setIsSignupOrLogin} />
        ) : (
          <SignupForm setIsSignupOrLogin={setIsSignupOrLogin} />
        )}
      </div>
    </div>
  );
}
