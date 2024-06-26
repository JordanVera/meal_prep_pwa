import Image from 'next/image';
import { Inter } from 'next/font/google';
import Sidebar from '@/components/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className={`flex`}>
      <Sidebar />

      <div className="w-full min-h-screen bg-zinc-900">yessirskiiii</div>
    </main>
  );
}
