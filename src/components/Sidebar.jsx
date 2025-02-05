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
  const { user, isCollapsed, setIsCollapsed } = useUser();

  return (
    <motion.div
      className={`bg-zinc-800 min-h-screen p-3 border-r border-zinc-600 flex flex-col justify-between h-full ${
        isCollapsed ? 'w-16' : 'w-[250px]'
      }`}
      initial={{ width: 250 }}
      animate={{ width: isCollapsed ? 64 : 250 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col space-y-1">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 text-white rounded bg-zinc-700 size-10"
        >
          <MenuIcon />
        </button>
        {/* <Link
          href={`/`}
          className="flex items-center justify-start gap-3 p-2 text-xs text-white rounded-lg hover:bg-zinc-700"
        >
          <Tooltip title="Home" placement="right" arrow>
            <Home className="w-6 h-6 text-orange-600" />
          </Tooltip>
          {!isCollapsed && 'Home'}
        </Link> */}
        <Link
          href={`/recipes`}
          className="flex items-center justify-start gap-3 p-2 text-xs text-white rounded-lg hover:bg-zinc-700"
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
          href={`/discover`}
          className="flex items-center justify-start gap-3 p-2 text-xs text-white rounded-lg hover:bg-zinc-700"
        >
          <Tooltip title="Discover" placement="right" arrow>
            <Brain className="w-6 h-6 text-purple-600" />
          </Tooltip>
          {!isCollapsed && 'Discover'}
        </Link>
        <Link
          href={`/mealPlan`}
          className="flex items-center gap-3 p-2 text-xs text-white rounded-lg justify-b hover:bg-zinc-700"
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
          {!isCollapsed && (
            <p className="px-1 py-0.5 ml-auto text-xs text-red-600 rounded-md bg-red-600/30">
              Coming Soon
            </p>
          )}
        </Link>
        <Link
          href={`/groceries`}
          className="flex items-center justify-start gap-3 p-2 text-xs text-white rounded-lg hover:bg-zinc-700"
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
          {!isCollapsed && (
            <p className="px-1 py-.05 ml-auto text-xs text-red-600 rounded-md bg-red-600/30">
              Coming Soon
            </p>
          )}
        </Link>
      </div>

      <div className="flex flex-col space-y-2">
        {user && (
          <button
            onClick={() => {
              signOut({ callbackUrl: '/?signedOut=true' });
            }}
            className="flex items-center justify-start gap-3 p-2 text-xs text-white rounded-lg hover:bg-zinc-700"
          >
            <Tooltip title="Signout" placement="right" arrow>
              <ExitToAppIcon className="w-6 h-6 text-red-600" />
            </Tooltip>
            {!isCollapsed && 'Signout'}
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default Sidebar;
