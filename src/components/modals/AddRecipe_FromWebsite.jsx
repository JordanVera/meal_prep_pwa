import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useUser } from '@/providers/UserContext';
import axios from 'axios';
import { BounceLoader } from 'react-spinners';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AddRecipe_FromWebsite() {
  const {
    handleOpenAddRecipeModal,
    handleOpenAddRecipeModalFull,
    openAddRecipeModal,
    currentRecipe,
    setCurrentRecipe,
  } = useUser();
  const [url, setUrl] = useState(
    'https://www.homechef.com/meals/steak-and-mushroom-white-wine-sauce-standard'
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recipe, setRecipe] = useState(null);

  const handleImport = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('/api/extract-recipe', { url });

      console.log('recipe data bru:');
      console.log(response.data);
      setCurrentRecipe(response.data.recipe);
    } catch (error) {
      setError('Failed to extract recipe');
    } finally {
      setLoading(false);
      handleOpenAddRecipeModal(); // Close the from website modal
      handleOpenAddRecipeModalFull(); // open the full add recipe modal with recipe data
    }
  };

  return (
    <Modal
      open={openAddRecipeModal}
      onClose={handleOpenAddRecipeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      size="small"
    >
      <Box sx={style} className="bg-zinc-900 rounded-xl w-[300px]">
        {loading ? (
          <BounceLoader color="#ff0000" loading={loading} size={50} />
        ) : (
          <div className="flex flex-col gap-3">
            <h2 className="font-bold text-sm text-center">Recipe URL</h2>
            <p className="text-xs text-center">
              Import the recipe url and we will import the ingredients
            </p>

            <input
              type="text"
              placeholder="https://www.homechef.com/meals/maple-bbq-pecan-crusted-chicken"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full mt-2 py-1 px-2 rounded-md bg-zinc-700 focus:outline-none border border-zinc-500 focus:border-blue-500"
            />

            <div className="flex flex-col gap-2">
              <button
                onClick={handleImport}
                className="border border-white rounded-md py-1"
                disabled={loading}
              >
                Import
              </button>
              <button
                onClick={handleOpenAddRecipeModal}
                className="text-red-500 border border-red-500 rounded-md py-1"
              >
                Cancel
              </button>
            </div>

            {error && (
              <p className="text-red-500 text-xs text-center mt-2">{error}</p>
            )}
            {/* {recipe && (
          <div className="mt-4">
          <h3 className="font-bold text-sm">Recipe:</h3>
          <p className="text-xs">{recipe.title}</p>
          <h4 className="font-bold text-xs mt-2">Ingredients:</h4>
          <ul className="list-disc list-inside">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="text-xs">
            {ingredient}
            </li>
            ))}
            </ul>
            <h4 className="font-bold text-xs mt-2">Instructions:</h4>
            <ol className="list-decimal list-inside">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="text-xs">
              {instruction}
              </li>
              ))}
              </ol>
              </div>
              )} */}
          </div>
        )}
      </Box>
    </Modal>
  );
}
