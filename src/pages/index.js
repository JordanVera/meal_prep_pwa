import Image from 'next/image';
import { Inter } from 'next/font/google';
import SignupForm from '@/components/SignupForm';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <div className="bg-zinc-900">
      <SignupForm />
    </div>
  );
}
