import { useState, useEffect } from 'react';

import { ChevronDown, Plus } from 'lucide-react'; // Assuming you're using Lucide for icons
import { useUser } from '@/providers/UserContext';

const AddRecipeButton = ({ recipe, setOpenDeleteRecipeModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const { handleOpenAddRecipeModalFull, setCurrentRecipe } = useUser();

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleDropdown}
        className="flex gap-1 items-center justify-center hover:bg-zinc-600 px-2 py-1 rounded-md"
      >
        <Plus className="h-4 w-4" />
        <ChevronDown className="h-3 w-3" /> {/* Your icon here */}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 shadow-lg rounded-md z-50">
          <button
            onClick={() => {
              setCurrentRecipe(recipe);
              handleOpenAddRecipeModalFull();
            }}
            className="block px-4 py-2 text-sm text-white hover:bg-zinc-800 w-full text-left"
          >
            Edit Recipe
          </button>

          <button
            onClick={() => setOpenDeleteRecipeModal((prev) => !prev)}
            className="block px-4 py-2 text-sm text-white hover:bg-zinc-800 w-full text-left"
          >
            Delete Recipe...
          </button>
        </div>
      )}
    </div>
  );
};

export default AddRecipeButton;
