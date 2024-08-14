import { useState } from 'react';
import Link from 'next/link';

const SignupBanner = () => {
  return (
    <footer className="fixed bottom-0 multi_gradient_bg w-full px-5 py-2 flex justify-between items-center">
      <h2 className="text-2xl font-bold text-black">M-M</h2>

      <p className="text-black font-bold text-md">
        Track health progress and meals by signing up today.{' '}
        <span className="font-normal">The best fitness app out there.</span>
      </p>

      <button className="bg-black text-white px-4 py-2 rounded-lg">
        Sign Up
      </button>
    </footer>
  );
};
export default SignupBanner;
