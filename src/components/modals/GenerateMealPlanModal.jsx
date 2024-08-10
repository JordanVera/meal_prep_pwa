import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useUser } from '@/providers/UserContext';
import axios from 'axios';
import { MoonLoader } from 'react-spinners';
import SpoonacularService from '@/services/SpoonacularService';

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

  const [calorieTarget, setCalorieTarget] = useState(1500);
  const [diet, setDiet] = useState('Gluten Free');
  const [timeFrame, setTimeFrame] = useState('day');

  useEffect(() => {
    console.log('calorieTarget: ', calorieTarget);
    console.log('diet: ', diet);
    console.log('timeFrame: ', timeFrame);
  }, [calorieTarget, diet, timeFrame]);

  const handleGenerateMealPlan = async () => {
    setLoading(true);
    try {
      const mealPlan = await SpoonacularService.generateMealPlan(
        calorieTarget,
        diet,
        timeFrame
      );

      console.log({ mealPlan });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
            <p className="text-white text-sm">Generating Meal Plan...</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <h2 className="font-bold text-sm text-center">
              Generate Meal Plan
            </h2>

            <label className="text-xs flex flex-col gap-1">
              Time Frame
              <select
                className="bg-gray-200 text-black border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                onChange={(e) => setTimeFrame(e.target.value)}
              >
                <option value="day">day</option>
                <option value="week">week</option>
              </select>
            </label>

            <label className="text-xs flex flex-col gap-1">
              Calorie Target
              <input
                onChange={(e) => setCalorieTarget(e.target.value)}
                defaultValue={calorieTarget}
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
              <select
                className="bg-gray-200 text-black border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                onChange={(e) => {
                  setDiet(e.target.value);
                }}
              >
                <option value="Gluten Free">Gluten Free</option>
                <option value="Ketogenic">Ketogenic</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Lacto-Vegetarian">Lacto-Vegetarian</option>
                <option value="Ovo-Vegetarian">Ovo-Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Pescetarian">Pescetarian</option>
                <option value="Paleo">Paleo</option>
                <option value="Low FODMAP">Low FODMAP</option>
                <option value="Whole30">Whole30</option>
              </select>
            </label>

            <div className="justify-center flex">
              <button
                onClick={handleGenerateMealPlan}
                className="bg-gradient-to-br from-blue-500 to-purple-700 rounded-md py-1 w-full mt-3"
                disabled={loading}
              >
                Generate Meal Plan
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
