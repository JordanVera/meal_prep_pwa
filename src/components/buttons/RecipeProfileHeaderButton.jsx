import { useState, useEffect } from 'react';

import { ChevronDown, Plus, Trash2, Pencil } from 'lucide-react'; // Added Pencil icon
import { useUser } from '@/providers/UserContext';

const AddRecipeButton = ({ recipe, setOpenDeleteRecipeModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const { handleOpenAddRecipeModalFull, setCurrentRecipe } = useUser();

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center gap-1 px-2 py-1 rounded-md hover:bg-zinc-600"
      >
        <Plus className="w-4 h-4" />
        <ChevronDown className="w-3 h-3" /> {/* Your icon here */}
      </button>
      {isOpen && (
        <div className="absolute right-0 z-50 w-48 mt-2 border rounded-md shadow-lg bg-zinc-900 border-zinc-800">
          <button
            onClick={() => {
              setCurrentRecipe(recipe);
              handleOpenAddRecipeModalFull();
            }}
            className="block w-full px-4 py-2 text-sm text-left text-white hover:bg-zinc-800"
          >
            <div className="flex items-center gap-2">
              <Pencil className="w-4 h-4" />
              Edit Recipe
            </div>
          </button>

          <button
            onClick={() => setOpenDeleteRecipeModal((prev) => !prev)}
            className="flex items-center w-full gap-2 px-4 py-2 text-sm text-left text-red-500 hover:bg-zinc-800"
          >
            <Trash2 className="w-4 h-4" />
            Delete Recipe
          </button>
        </div>
      )}
    </div>
  );
};

export default AddRecipeButton;
