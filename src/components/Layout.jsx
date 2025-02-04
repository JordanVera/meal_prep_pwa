import { useUser } from '@/providers/UserContext';
import Sidebar from '@/components/Sidebar';
import AddRecipe_FromWebsite from '@/components/modals/AddRecipe_FromWebsite';
import AddRecipe from '@/components/modals/AddRecipe';
import GenerateMealPlanModal from '@/components/modals/GenerateMealPlanModal';
import { useEffect } from 'react';

const Layout = ({ Component, pageProps }) => {
  const { user } = useUser();

  return (
    <div className="relative flex h-screen">
      {user && <Sidebar />}

      <div className="flex-1 overflow-auto bg-zinc-900">
        <Component {...pageProps} />

        <GenerateMealPlanModal />
        <AddRecipe />
        <AddRecipe_FromWebsite />
      </div>
    </div>
  );
};

export default Layout;
