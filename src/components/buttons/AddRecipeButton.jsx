import { useState, useEffect } from 'react';
import { ChevronDown, Plus, Earth } from 'lucide-react'; // Assuming you're using Lucide for icons
import { useUser } from '@/providers/UserContext';

const AddRecipeButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const { isLoading, handleOpenAddRecipeModal, handleOpenAddRecipeModalFull } =
    useUser();

  useEffect(() => {
    console.log({ isLoading });
  }, [isLoading]);

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center gap-1 px-2 py-1 rounded-md hover:bg-zinc-600"
      >
        <Plus className="w-4 h-4 my-1" />
        <ChevronDown className="w-3 h-3" /> {/* Your icon here */}
      </button>
      {isOpen && (
        <div className="absolute right-0 z-50 w-48 mt-2 border rounded-md shadow-lg bg-zinc-900 border-zinc-800">
          <button
            onClick={handleOpenAddRecipeModalFull}
            className="flex items-center w-full gap-2 px-4 py-2 text-sm text-left text-white hover:bg-zinc-800"
          >
            <Plus className="w-4 h-4 my-1" />
            Add Manually
          </button>

          <button
            onClick={handleOpenAddRecipeModal}
            className="flex items-center w-full gap-2 px-4 py-2 text-sm text-left text-white hover:bg-zinc-800"
          >
            <Earth className="w-4 h-4 my-1" />
            From Website
          </button>
        </div>
      )}
    </div>
  );
};

export default AddRecipeButton;
