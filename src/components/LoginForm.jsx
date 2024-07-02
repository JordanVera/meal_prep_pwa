// components/LoginForm.js
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { showSuccessToast, showErrorToast } from '@/utils/toasts';

const LoginForm = ({ setIsSignupOrLogin }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const result = await signIn('credentials', {
        redirect: false,
        identifier,
        password,
      });

      if (result.error) {
        showErrorToast(result.error);
      } else {
        router.push('/recipes');
        showSuccessToast('Login Successful');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 w-[300px] lg:w-[400px]"
    >
      <label className="text-xs flex flex-col gap-1">
        Email or Username
        <input
          className="w-full py-1 px-2 rounded-md bg-zinc-800 focus:outline-none border border-zinc-700 focus:border-blue-500"
          type="text"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          placeholder="Email or Username"
          required
        />
      </label>
      <label className="text-xs flex flex-col gap-1">
        Password
        <input
          className="w-full py-1 px-2 rounded-md bg-zinc-800 focus:outline-none border border-zinc-700 focus:border-blue-500"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
      </label>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        className="bg-gradient-to-br from-blue-500 to-purple-700 rounded-md py-1"
        type="submit"
      >
        Login
      </button>

      <p className="text-sm text-center">
        Don&apos;t have an account?{' '}
        <button
          onClick={() => setIsSignupOrLogin((prev) => !prev)}
          className="text-blue-400 underline"
          href={'/'}
        >
          Signup Here
        </button>
      </p>
    </form>
  );
};

export default LoginForm;
