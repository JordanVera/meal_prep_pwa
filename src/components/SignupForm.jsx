import { useState } from 'react';
import axios from 'axios';

const SignupForm = ({ setIsSignupOrLogin }) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('/api/auth/signup', {
        email,
        firstName,
        lastName,
        password,
      });

      if (response.data.message === 'User created successfully') {
        // Handle success (e.g., redirect to login)
        console.log('USE CREATED SUCCSSFULLY');
        console.log(response.data);
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 w-[300px] lg:w-[400px]"
    >
      <label className="flex flex-col gap-1 text-xs">
        Email
        <input
          className="w-full px-2 py-1 border rounded-md bg-zinc-800 focus:outline-none border-zinc-700 focus:border-blue-500"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
      </label>
      <div className="flex gap-5">
        <label className="flex flex-col w-full gap-1 text-xs">
          First Name
          <input
            className="w-full px-2 py-1 border rounded-md bg-zinc-800 focus:outline-none border-zinc-700 focus:border-blue-500"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            required
          />
        </label>
        <label className="flex flex-col w-full gap-1 text-xs">
          Last Name
          <input
            className="w-full px-2 py-1 border rounded-md bg-zinc-800 focus:outline-none border-zinc-700 focus:border-blue-500"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            required
          />
        </label>
      </div>
      <label className="flex flex-col gap-1 text-xs">
        Password
        <input
          className="w-full px-2 py-1 border rounded-md bg-zinc-800 focus:outline-none border-zinc-700 focus:border-blue-500"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
      </label>
      <label className="flex flex-col gap-1 text-xs">
        Confirm Password
        <input
          className="w-full px-2 py-1 border rounded-md bg-zinc-800 focus:outline-none border-zinc-700 focus:border-blue-500"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Password"
          required
        />
      </label>
      {error && <p>{error}</p>}
      <button
        className="py-1 rounded-md bg-gradient-to-br from-blue-500 to-purple-700"
        type="submit"
      >
        Sign Up
      </button>

      <p className="text-sm text-center">
        Already have an account?{' '}
        <button
          onClick={() => setIsSignupOrLogin((prev) => !prev)}
          className="text-blue-400 underline"
          href={'/login'}
        >
          Login Here
        </button>
      </p>
    </form>
  );
};

export default SignupForm;
