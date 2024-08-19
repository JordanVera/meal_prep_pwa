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
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

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
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col space-y-2">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-white bg-zinc-700 p-2 rounded size-10"
          >
            <MenuIcon />
          </button>
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

        <div className="flex flex-col space-y-2">
          {user && (
            <button
              onClick={() => {
                signOut({ callbackUrl: '/?signedOut=true' });
              }}
              className="text-white text-sm flex gap-3 items-center justify-start hover:bg-zinc-700 rounded-lg p-2"
            >
              <Tooltip title="Signout" placement="right" arrow>
                <ExitToAppIcon className="text-red-600 h-6 w-6" />
              </Tooltip>
              {!isCollapsed && 'Signout'}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
