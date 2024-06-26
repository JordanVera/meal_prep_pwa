// components/LoginForm.js
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      setError(result.error);
    } else {
      router.push('/recipes');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 w-[300px] lg:w-[400px]"
    >
      <label className="text-xs flex flex-col gap-1">
        Email
        <input
          className="w-full py-1 px-2 rounded-md bg-zinc-800 focus:outline-none border border-zinc-700 focus:border-blue-500"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
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
      {error && <p>{error}</p>}
      <button
        className="bg-gradient-to-br from-blue-500 to-purple-700 rounded-md py-1"
        type="submit"
      >
        Login
      </button>

      <p className="text-sm text-center">
        Don't have an account?{' '}
        <Link className="text-blue-400 underline" href={'/'}>
          Signup Here
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
