import { useState, useEffect } from 'react';
import { Search, Brain } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Sidebar = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <aside className="bg-zinc-800 w-[300px] min-h-screen p-5">
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

      <div className="flex flex-col gap-2">
        <h2 className="text-white text-xs font-bold mt-5">Library</h2>
        <div className="flex flex-col gap-2">
          <Link
            href={`/`}
            className="text-white text-sm flex gap-3 items-center"
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
            href={`/`}
            className="text-white text-sm flex gap-3 items-center"
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
            href={`/`}
            className="text-white text-sm flex gap-3 items-center"
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
            href={`/`}
            className="text-white text-sm flex gap-3 items-center"
          >
            <Brain className="text-purple-600" />
            Discover
          </Link>
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;
