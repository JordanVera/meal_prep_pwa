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

export default function AddRecipe() {
  const {
    handleOpenAddRecipeModalFull,
    openAddRecipeModalFull,
    currentRecipe,
    fetchCurrentlyLoggedInUser,
  } = useUser();
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(currentRecipe.title || '');
  const [servings, setServings] = useState(currentRecipe.servings || '');
  const [calories, setCalories] = useState('');
  const [cookTime, setCookTime] = useState(currentRecipe.readyInMinutes || '');
  const [instructions, setInstructions] = useState(
    currentRecipe.instructions || ''
  );
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    console.log('CURRENT RECIPE BRU');
    console.log(currentRecipe);

    setTitle(currentRecipe.title || '');
    setServings(currentRecipe.servings || '');
    setCookTime(currentRecipe.readyInMinutes || '');
    setInstructions(currentRecipe.instructions || '');

    setSteps(extractSteps(currentRecipe.instructions || ''));
    // setCalories('');
  }, [currentRecipe]);

  useEffect(() => {
    console.log({ instructions });
  }, [instructions]);
  useEffect(() => {
    console.log({ steps });
  }, [steps]);

  const handleSaveRecipe = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/recipe', {
        title,
        servings,
        calories,
        cookTime,
        instructions,
        image: currentRecipe.image,
        sourceUrl: currentRecipe.sourceUrl,
        sourceName: currentRecipe.sourceName,
        steps,
      });

      console.log('Saved recipe:', response.data);
      handleOpenAddRecipeModalFull();
      await fetchCurrentlyLoggedInUser();
    } catch (error) {
      console.error('Failed to save recipe:', error);
    } finally {
      setLoading(false);
    }
  };

  const extractSteps = (text) => {
    // Regular expression to match steps starting with a number followed by some text
    const stepPattern = /\d+\s*\n\s*([A-Za-z].*?)(?=\n\d+|\n*$)/gs;
    let steps = [];
    let match;

    // Loop through all matches of the pattern in the text
    while ((match = stepPattern.exec(text)) !== null) {
      steps.push(match[1].trim());
    }

    return steps;
  };

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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full py-1 px-2 rounded-md bg-zinc-800 focus:outline-none border border-zinc-700 focus:border-blue-500"
              />
            </label>

            <div className="flex flex-col gap-3">
              <label className="text-xs flex flex-col gap-1">
                Servings
                <input
                  type="text"
                  value={servings}
                  onChange={(e) => setServings(e.target.value)}
                  className="w-full py-1 px-2 rounded-md bg-zinc-800 focus:outline-none border border-zinc-700 focus:border-blue-500"
                />
              </label>

              <label className="text-xs flex flex-col gap-1">
                Calories
                <input
                  type="text"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  className="w-full py-1 px-2 rounded-md bg-zinc-800 focus:outline-none border border-zinc-700 focus:border-blue-500"
                />
              </label>

              <label className="text-xs flex flex-col gap-1">
                Cook Time
                <input
                  type="text"
                  value={cookTime}
                  onChange={(e) => setCookTime(e.target.value)}
                  className="w-full py-1 px-2 rounded-md bg-zinc-800 focus:outline-none border border-zinc-700 focus:border-blue-500"
                />
              </label>
            </div>

            <label className="text-xs flex flex-col gap-1">
              Image
              {currentRecipe?.image ? (
                <img src={currentRecipe?.image} height={200} width={200} />
              ) : (
                <p>no image...</p>
              )}
            </label>

            <label className="text-xs flex flex-col gap-1">
              Instructions
              <textarea
                type="text"
                rows="7"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="w-full py-1 px-2 rounded-md bg-zinc-800 focus:outline-none border border-zinc-700 focus:border-blue-500"
              />
            </label>

            <div className="flex flex-col gap-2">
              <button
                onClick={handleSaveRecipe}
                className="bg-gradient-to-br from-blue-500 to-purple-700 rounded-md py-1"
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
