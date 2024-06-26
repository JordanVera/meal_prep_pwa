import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useUser } from '@/providers/UserContext';
import axios from 'axios';
import { BounceLoader } from 'react-spinners';
import Image from 'next/image';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AddRecipe({ recipe }) {
  const {
    handleOpenAddRecipeModalFull,
    openAddRecipeModalFull,
    currentRecipe,
  } = useUser();
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(currentRecipe.title || '');
  const [servings, setServings] = useState('');
  const [calories, setCalories] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [instructions, setInstructions] = useState('');

  useEffect(() => {
    console.log({ currentRecipe });
  }, [currentRecipe]);

  return (
    <Modal
      open={openAddRecipeModalFull}
      onClose={handleOpenAddRecipeModalFull}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      size="small"
    >
      <Box sx={style} className="bg-zinc-900 rounded-xl w-[400px]">
        {loading ? (
          <BounceLoader color="#ff0000" loading={loading} size={50} />
        ) : (
          <div className="flex flex-col gap-10">
            <h2 className="font-bold text-sm text-center">Add Recipe</h2>

            <label className="text-xs flex flex-col gap-1">
              Title
              <input
                type="text"
                // placeholder="www.example.com/recipe"
                value={currentRecipe?.recipe?.title || title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full py-1 px-2 rounded-md bg-zinc-800 focus:outline-none border border-zinc-700 focus:border-blue-500"
              />
            </label>

            <div className="flex flex-col gap-3">
              <label className="text-xs flex flex-col gap-1">
                Servings
                <input
                  type="text"
                  // placeholder="www.example.com/recipe"
                  value={currentRecipe?.recipe?.servings || servings}
                  onChange={(e) => setServings(e.target.value)}
                  className="w-full py-1 px-2 rounded-md bg-zinc-800 focus:outline-none border border-zinc-700 focus:border-blue-500"
                />
              </label>

              <label className="text-xs flex flex-col gap-1">
                Calories
                <input
                  type="text"
                  // placeholder="www.example.com/recipe"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  className="w-full py-1 px-2 rounded-md bg-zinc-800 focus:outline-none border border-zinc-700 focus:border-blue-500"
                />
              </label>

              {/* <label className="text-xs flex flex-col gap-1">
                Prep Time
                <input
                  type="text"
                  // placeholder="www.example.com/recipe"
                  value={prepTime}
                  onChange={(e) => setPrepTime(e.target.value)}
                  className="w-full py-1 px-2 rounded-md bg-zinc-800 focus:outline-none border border-zinc-700 focus:border-blue-500"
                />
              </label> */}

              <label className="text-xs flex flex-col gap-1">
                Cook Time
                <input
                  type="text"
                  // placeholder="www.example.com/recipe"
                  value={currentRecipe?.recipe?.readyInMinutes || cookTime}
                  onChange={(e) => setCookTime(e.target.value)}
                  className="w-full py-1 px-2 rounded-md bg-zinc-800 focus:outline-none border border-zinc-700 focus:border-blue-500"
                />
              </label>
            </div>

            <label className="text-xs flex flex-col gap-1">
              Image
              {currentRecipe?.recipe?.image ? (
                <img
                  src={currentRecipe?.recipe?.image}
                  height={200}
                  width={200}
                />
              ) : (
                <p>no image...</p>
              )}
            </label>

            <label className="text-xs flex flex-col gap-1">
              Instructions
              <textarea
                type="text"
                rows="7"
                // placeholder="www.example.com/recipe"
                value={currentRecipe?.recipe?.instructions || instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="w-full py-1 px-2 rounded-md bg-zinc-800 focus:outline-none border border-zinc-700 focus:border-blue-500"
              />
            </label>

            <div className="flex flex-col gap-2">
              <button
                onClick={handleOpenAddRecipeModalFull}
                className="bg-gradient-to-br from-orange-600 to-red-500 rounded-md py-1"
              >
                Add Recipe
              </button>
            </div>
          </div>
        )}
      </Box>
    </Modal>
  );
}
