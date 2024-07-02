import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useUser } from '@/providers/UserContext';
import axios from 'axios';
import { BounceLoader } from 'react-spinners';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Plus, Minus } from 'lucide-react';

import Collapse from '@mui/material/Collapse';

import { TransitionGroup } from 'react-transition-group';

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
  const [addingNewStep, setAddingNewStep] = useState(false);

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

  useEffect(() => {
    console.log({ steps });
  }, [steps]);

  return (
    <Modal
      open={openAddRecipeModalFull}
      onClose={handleOpenAddRecipeModalFull}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      size="small"
    >
      <Box
        sx={style}
        className="bg-zinc-900 rounded-xl  min-w-[450px] max-w-[600px] overflow-scroll"
      >
        {loading ? (
          <BounceLoader color="#ff0000" loading={loading} size={50} />
        ) : (
          <div className="flex flex-col gap-10 max-h-[90vh] ">
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

            <section>
              <h2 className="text-xs mb-1">Steps</h2>
              <div className="bg-zinc-800 rounded-md">
                <TransitionGroup>
                  {steps.map((step, index) => (
                    <Collapse key={index} in={true}>
                      <div className="border-b border-gray-600 p-3 flex items-center gap-5">
                        <button
                          className="rounded-full bg-red-600"
                          onClick={() => {
                            setSteps((currentSteps) =>
                              currentSteps.filter((_, i) => i !== index)
                            );
                          }}
                        >
                          <Minus className="h-4 w-4" />
                        </button>{' '}
                        <p className="text-xs">{step}</p>
                        {addingNewStep && steps.length - 1 === index && (
                          <input
                            autoFocus
                            type="text"
                            name="step"
                            id="step"
                            className="bg-zinc-800 text-white text-xs p-2 focus:outline-none w-full flex-grow"
                          />
                        )}
                      </div>
                    </Collapse>
                  ))}
                </TransitionGroup>

                <div className="flex gap-3 items-center p-3">
                  <button
                    onClick={() => {
                      setSteps((prev) => [...prev, '']);
                      setAddingNewStep(true);
                    }}
                    className="bg-gradient-to-br from-blue-500 to-purple-700 w-full rounded-md py-2 text-xs flex items-center justify-center gap-1.5"
                  >
                    <Plus className="h-4 w-4" />
                    Add Step
                  </button>

                  <MoreHorizIcon className="h-6 w-6" />
                </div>
              </div>
            </section>

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
                className="text-xs bg-gradient-to-br from-blue-500 to-purple-700 rounded-md py-2"
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
