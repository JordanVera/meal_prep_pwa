import { useState, useEffect } from 'react';
import { Search, Brain, Home } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '@/providers/UserContext';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

const Sidebar = () => {
  const [searchText, setSearchText] = useState('');
  const { user, handleLogout } = useUser();

  const { data: session, status } = useSession();

  useEffect(() => {
    console.log({ user });
  }, [user]);

  useEffect(() => {
    console.log({ session });
  }, [session]);

  return (
    <aside className="bg-zinc-800 w-[250px] min-h-screen p-3 border-r border-zinc-600 fixed top-0">
      {user && (
        <button
          onClick={() => {
            signOut({ callbackUrl: '/?signedOut=true' });
          }}
          className="bg-black text-white px-3 py-1 rounded-md"
        >
          Signout
        </button>
      )}
      <div className="relative">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-zinc-600 h-5 w-5" />
        <input
          onChange={(e) => setSearchText(e.target.value)}
          type="text"
          placeholder="Search..."
          value={searchText}
          className="pl-9 pr-2 py-1 w-full rounded-md text-white bg-transparent border border-zinc-600 focus:outline-none"
        />
      </div>

      <div className="flex flex-col">
        <h2 className="text-zinc-500 text-xs font-bold mt-5 px-2">Library</h2>
        <div className="flex flex-col">
          <Link
            href={`/`}
            className="text-white text-sm flex gap-3 items-center justify-start hover:bg-zinc-700 rounded-lg p-2"
          >
            <Home className="text-orange-600 h-6 w-6" />
            Home
          </Link>
          <Link
            href={`/mealPlan`}
            className="text-white text-sm flex gap-3 items-center justify-start hover:bg-zinc-700 rounded-lg p-2"
          >
            <Image
              height={10}
              width={26}
              src={'/icons/mealPlan.png'}
              alt="logo"
            />
            Meal Plan
          </Link>
          <Link
            href={`/recipes`}
            className="text-white text-sm flex gap-3 items-center justify-start hover:bg-zinc-700 rounded-lg p-2"
          >
            <Image
              height={10}
              width={26}
              src={'/icons/recipes.png'}
              alt="logo"
            />
            Recipes
          </Link>
          <Link
            href={`/groceries`}
            className="text-white text-sm flex gap-3 items-center justify-start hover:bg-zinc-700 rounded-lg p-2"
          >
            <Image
              height={10}
              width={26}
              src={'/icons/groceries.png'}
              alt="logo"
            />
            Groceries
          </Link>
          <Link
            href={`/discover`}
            className="text-white text-sm flex gap-3 items-center justify-start hover:bg-zinc-700 rounded-lg p-2"
          >
            <Brain className="text-purple-600 h-6 w-6" />
            Discover
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
