import { useUser } from '@/providers/UserContext';
import Link from 'next/link';
// import { X } from 'lucide-solid';
import {Close}

const SignupBanner = () => {
  const { user } = useUser();

  return (
    <header className="multi_gradient_bg  fixed bottom-0 w-full px-5 py-2 flex items-center justify-between">
      <h2 className="text-2xl text-black font-bold">M-M</h2>
      <p className="text-black font-bold capitalize">
        Track health progess by signing up now.{' '}
        <span className="font-normal">The best nutrition app out.</span>
      </p>

      <Link
        href="/?signup=true"
        className="bg-black text-white px-3 py-1 rounded-md"
      >
        Signup
      </Link>
{/* 
      <button>
        <X />
      </button> */}
    </header>
  );
};
export default SignupBanner;
