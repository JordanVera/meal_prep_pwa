// components/SignupForm.js
import { useState } from 'react';
import axios from 'axios';

const SignupForm = () => {
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-[400px]">
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
      <div className="flex gap-5">
        <label className="text-xs flex flex-col gap-1 w-full">
          First Name
          <input
            className="w-full py-1 px-2 rounded-md bg-zinc-800 focus:outline-none border border-zinc-700 focus:border-blue-500"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            required
          />
        </label>
        <label className="text-xs flex flex-col gap-1 w-full">
          Last Name
          <input
            className="w-full py-1 px-2 rounded-md bg-zinc-800 focus:outline-none border border-zinc-700 focus:border-blue-500"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            required
          />
        </label>
      </div>
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
      <label className="text-xs flex flex-col gap-1">
        Confirm Password
        <input
          className="w-full py-1 px-2 rounded-md bg-zinc-800 focus:outline-none border border-zinc-700 focus:border-blue-500"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Password"
          required
        />
      </label>
      {error && <p>{error}</p>}
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;
