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
  const [ingredients, setIngredients] = useState([]);
  const [addingNewStep, setAddingNewStep] = useState(false);
  const [recipeId, setRecipeId] = useState(0);

  useEffect(() => {
    // console.log('CURRENT RECIPE BRU');
    // console.log(currentRecipe);

    setRecipeId(currentRecipe.id || 0);
    setTitle(currentRecipe.title || '');
    setServings(currentRecipe.servings || '');
    setCookTime(currentRecipe.readyInMinutes || '');
    setSteps(extractSteps(currentRecipe.instructions || ''));
    setIngredients(currentRecipe.extendedIngredients || []);
    setInstructions(currentRecipe.summary || '');
  }, [currentRecipe]);

  // useEffect(() => {
  //   console.log({ instructions });
  // }, [instructions]);

  // useEffect(() => {
  //   console.log({ steps });
  // }, [steps]);

  // useEffect(() => {
  //   console.log({ ingredients });
  // }, [ingredients]);

  // useEffect(() => {
  //   console.log('RECIPE ID: ');
  //   console.log(recipeId);
  // }, [recipeId]);

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
        ingredients,
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
      <Box
        sx={style}
        className="bg-zinc-900 rounded-xl  min-w-[450px] max-w-[600px] overflow-scroll"
      >
        {loading ? (
          <BounceLoader color="#ff0000" loading={loading} size={50} />
        ) : (
          <div className="flex flex-col gap-10 max-h-[90vh] ">
            <h2 className="text-sm font-bold text-center">Add Recipe</h2>

            <label className="flex flex-col gap-1 text-xs">
              Title
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-2 py-1 border rounded-md bg-zinc-800 focus:outline-none border-zinc-700 focus:border-blue-500"
              />
            </label>

            <div className="flex flex-col gap-3">
              <label className="flex flex-col gap-1 text-xs">
                Servings
                <input
                  type="text"
                  value={servings}
                  onChange={(e) => setServings(e.target.value)}
                  className="w-full px-2 py-1 border rounded-md bg-zinc-800 focus:outline-none border-zinc-700 focus:border-blue-500"
                />
              </label>

              <label className="flex flex-col gap-1 text-xs">
                Calories
                <input
                  type="text"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  className="w-full px-2 py-1 border rounded-md bg-zinc-800 focus:outline-none border-zinc-700 focus:border-blue-500"
                />
              </label>

              <label className="flex flex-col gap-1 text-xs">
                Cook Time
                <input
                  type="text"
                  value={cookTime}
                  onChange={(e) => setCookTime(e.target.value)}
                  className="w-full px-2 py-1 border rounded-md bg-zinc-800 focus:outline-none border-zinc-700 focus:border-blue-500"
                />
              </label>
            </div>

            <label className="flex flex-col gap-1 text-xs">
              Image
              {currentRecipe?.image ? (
                <img src={currentRecipe?.image} height={200} width={200} />
              ) : (
                <p>no image...</p>
              )}
            </label>

            <section>
              <h2 className="mb-1 text-xs">Ingredients</h2>

              <div className="rounded-md bg-zinc-800">
                <TransitionGroup>
                  {ingredients.map((ingredient, index) => (
                    <Collapse key={index} in={true}>
                      <div className="flex items-center gap-5 p-3 border-b border-gray-600">
                        <button
                          className="bg-red-600 rounded-full"
                          onClick={() => {
                            setIngredients((currentIngredients) =>
                              currentIngredients.filter((_, i) => i !== index)
                            );
                          }}
                        >
                          <Minus className="w-4 h-4" />
                        </button>{' '}
                        <p className="text-xs">{ingredient.originalName}</p>
                      </div>
                    </Collapse>
                  ))}
                </TransitionGroup>

                <div className="flex items-center gap-3 p-3">
                  <button
                    onClick={() => {
                      setSteps((prev) => [...prev, '']);
                      setAddingNewStep(true);
                    }}
                    className="bg-gradient-to-br from-blue-500 to-purple-700 w-full rounded-md py-2 text-xs flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    Add Ingredient
                  </button>

                  <MoreHorizIcon className="w-6 h-6" />
                </div>
              </div>
            </section>

            <section>
              <h2 className="mb-1 text-xs">Steps</h2>
              <div className="rounded-md bg-zinc-800">
                <TransitionGroup>
                  {steps.map((step, index) => (
                    <Collapse key={index} in={true}>
                      <div className="flex items-center gap-5 p-3 border-b border-gray-600">
                        <button
                          className="bg-red-600 rounded-full"
                          onClick={() => {
                            setSteps((currentSteps) =>
                              currentSteps.filter((_, i) => i !== index)
                            );
                          }}
                        >
                          <Minus className="w-4 h-4" />
                        </button>{' '}
                        <p className="text-xs">{step}</p>
                        {addingNewStep && steps.length - 1 === index && (
                          <input
                            autoFocus
                            type="text"
                            name="step"
                            id="step"
                            className="flex-grow w-full p-2 text-xs text-white bg-zinc-800 focus:outline-none"
                          />
                        )}
                      </div>
                    </Collapse>
                  ))}
                </TransitionGroup>

                <div className="flex items-center gap-3 p-3">
                  <button
                    onClick={() => {
                      setSteps((prev) => [...prev, '']);
                      setAddingNewStep(true);
                    }}
                    className="bg-gradient-to-br from-blue-500 to-purple-700 w-full rounded-md py-2 text-xs flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    Add Step
                  </button>

                  <MoreHorizIcon className="w-6 h-6" />
                </div>
              </div>
            </section>

            <label className="flex flex-col gap-1 text-xs">
              Instructions
              <textarea
                type="text"
                rows="7"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="w-full px-2 py-1 border rounded-md bg-zinc-800 focus:outline-none border-zinc-700 focus:border-blue-500"
              />
            </label>

            <div className="flex flex-col gap-2">
              <button
                onClick={handleSaveRecipe}
                className="py-2 text-xs rounded-md bg-gradient-to-br from-blue-500 to-purple-700"
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
