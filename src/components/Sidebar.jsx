import { useState, useEffect } from 'react';
import { Search, Brain, Home } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '@/providers/UserContext';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';

const Sidebar = () => {
  const [searchText, setSearchText] = useState('');
  const { user, handleLogout, isCollapsed, setIsCollapsed } = useUser();

  const { data: session, status } = useSession();

  useEffect(() => {
    console.log({ user });
  }, [user]);

  useEffect(() => {
    console.log({ session });
  }, [session]);

  return (
    <motion.div
      className={`bg-zinc-800 min-h-screen p-3 border-r border-zinc-600 ${
        isCollapsed ? 'w-16' : 'w-[250px]'
      }`}
      initial={{ width: 250 }}
      animate={{ width: isCollapsed ? 64 : 250 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-5">
        {/* {user && (
            <button
              onClick={() => {
                signOut({ callbackUrl: '/?signedOut=true' });
              }}
              className="bg-black text-white px-3 py-1 rounded-md"
            >
              Signout
            </button>
          )} */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-white bg-zinc-700 p-2 rounded"
        >
          <MenuIcon />
        </button>
      </div>

      {/* {!isCollapsed && (
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
        )} */}

      <div className="flex flex-col mt-5">
        <div className="flex flex-col mt-2 space-y-2">
          <Link
            href={`/`}
            className="text-white text-sm flex gap-3 items-center justify-start hover:bg-zinc-700 rounded-lg p-2"
          >
            <Tooltip title="Home" placement="right" arrow>
              <Home className="text-orange-600 h-6 w-6" />
            </Tooltip>
            {!isCollapsed && 'Home'}
          </Link>
          <Link
            href={`/mealPlan`}
            className="text-white text-sm flex gap-3 items-center justify-start hover:bg-zinc-700 rounded-lg p-2"
          >
            <Tooltip title="Meal Plan" placement="right" arrow>
              <Image
                height={10}
                width={26}
                src={'/icons/mealPlan.png'}
                alt="logo"
              />
            </Tooltip>
            {!isCollapsed && 'Meal Plan'}
          </Link>
          <Link
            href={`/recipes`}
            className="text-white text-sm flex gap-3 items-center justify-start hover:bg-zinc-700 rounded-lg p-2"
          >
            <Tooltip title="Recipes" placement="right" arrow>
              <Image
                height={10}
                width={26}
                src={'/icons/recipes.png'}
                alt="logo"
              />
            </Tooltip>
            {!isCollapsed && 'Recipes'}
          </Link>
          <Link
            href={`/groceries`}
            className="text-white text-sm flex gap-3 items-center justify-start hover:bg-zinc-700 rounded-lg p-2"
          >
            <Tooltip title="Groceries" placement="right" arrow>
              <Image
                height={10}
                width={26}
                src={'/icons/groceries.png'}
                alt="logo"
              />
            </Tooltip>
            {!isCollapsed && 'Groceries'}
          </Link>
          <Link
            href={`/discover`}
            className="text-white text-sm flex gap-3 items-center justify-start hover:bg-zinc-700 rounded-lg p-2"
          >
            <Tooltip title="Discover" placement="right" arrow>
              <Brain className="text-purple-600 h-6 w-6" />
            </Tooltip>
            {!isCollapsed && 'Discover'}
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
