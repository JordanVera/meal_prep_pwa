import { useState } from 'react';
import SignupForm from '@/components/SignupForm';
import LoginForm from '@/components/LoginForm';

export default function Home() {
  const [isSignupOrLogin, setIsSignupOrLogin] = useState(true);

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
