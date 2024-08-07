import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useUser } from '@/providers/UserContext';
import axios from 'axios';
import { MoonLoader } from 'react-spinners';

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
    setCurrentRecipe,
  } = useUser();

  const [url, setUrl] = useState(
    'https://www.homechef.com/meals/steak-and-mushroom-white-wine-sauce-standard'
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
          <div className="flex gap-2 5 items-center justify-center">
            <MoonLoader color="#fff" size={25} />
            <p className="text-white text-sm">Extracting Recipe...</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <h2 className="font-bold text-sm text-center">Recipe URL</h2>
            <p className="text-xs text-center">
              Import the recipe url and we will import the ingredients
            </p>

            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="https://www.homechef.com/meals/maple-bbq-pecan-crusted-chicken"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full mt-2 py-1 px-2 rounded-md bg-zinc-700 focus:outline-none border border-zinc-500 focus:border-blue-500"
              />

              <button
                onClick={handleImport}
                className="bg-gradient-to-br from-blue-500 to-purple-700 rounded-md py-1"
                disabled={loading}
              >
                Import
              </button>
              <button
                onClick={handleOpenAddRecipeModal}
                className="bg-gradient-to-br from-red-500 to-red-900 rounded-md py-1"
              >
                Cancel
              </button>
            </div>

            {/* <hr className="my-2 border-b border-zinc-700" /> */}

            <div className="justify-center flex">
              <button
                onClick={() => {
                  handleOpenAddRecipeModal();
                  handleOpenAddRecipeModalFull();
                }}
                className="capitalize text-xs text-blue-500 hover:text-white mt-3"
              >
                or enter manually
              </button>
            </div>

            {error && (
              <p className="text-red-500 text-xs text-center mt-2">{error}</p>
            )}
          </div>
        )}
      </Box>
    </Modal>
  );
}
