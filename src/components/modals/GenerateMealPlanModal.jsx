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

export default function GenerateMealPlanModal() {
  const { handleOpenGenerateMealPlanModal, openGenerateMealPlanModal } =
    useUser();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  return (
    <Modal
      open={openGenerateMealPlanModal}
      onClose={handleOpenGenerateMealPlanModal}
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
            <h2 className="font-bold text-sm text-center">
              Generate Meal Plan
            </h2>

            <label className="text-xs flex flex-col gap-1">
              Time Frame
              <select className="bg-gray-200 text-black border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-700">
                <option value="day">day</option>
                <option value="week">week</option>
              </select>
            </label>

            <label className="text-xs flex flex-col gap-1">
              Calorie Target
              <input
                type="number"
                name="calorieTarget"
                id=""
                className="bg-gray-200 text-black border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </label>

            <label className="text-xs flex flex-col gap-1">
              Diet
              <select className="bg-gray-200 text-black border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-700">
                <option value="day">Gluten Free</option>
                <option value="week">Ketogenic</option>
                <option value="week">Vegetarian</option>
                <option value="week">Lacto-Vegetarian</option>
                <option value="week">Ovo-Vegetarian</option>
                <option value="week">Vegan</option>
                <option value="week">Pescetarian</option>
                <option value="week">Paleo</option>
                <option value="week">Low FODMAP</option>
                <option value="week">Whole30</option>
              </select>
            </label>

            {/* <div className="justify-center flex">
              <button
                onClick={() => {
                  handleOpenAddRecipeModal();
                  handleOpenAddRecipeModalFull();
                }}
                className="capitalize text-xs text-blue-500 hover:text-white mt-3"
              >
                or enter manually
              </button>
            </div> */}

            {error && (
              <p className="text-red-500 text-xs text-center mt-2">{error}</p>
            )}
          </div>
        )}
      </Box>
    </Modal>
  );
}
