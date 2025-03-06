import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useUser } from '@/providers/UserContext';
import { MoonLoader } from 'react-spinners';
import axios from 'axios';
import { showErrorToast } from '@/utils/toasts';
import ExerciseService from '@/services/ExerciseService';
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
  const { openGenerateWorkoutPlanModal, handleOpenGenerateWorkoutPlanModal } =
    useUser();

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    daysPerWeek: '3',
    hasGymAccess: false,
    fitnessLevel: 'beginner',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await ExerciseService.generateWorkoutPlan(
        Number(formData.height),
        Number(formData.weight),
        Number(formData.daysPerWeek),
        formData.hasGymAccess,
        formData.fitnessLevel
      );
      console.log('Workout Plan:', response);
    } catch (error) {
      console.error('Error generating workout plan:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <Modal
      open={openGenerateWorkoutPlanModal}
      onClose={handleOpenGenerateWorkoutPlanModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      size="small"
    >
      <Box sx={style} className="bg-zinc-900 rounded-xl w-[300px]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-200">
              Height (cm):
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="block w-full mt-1 rounded-md bg-zinc-700 border-zinc-600 text-zinc-200"
                required
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-200">
              Weight (kg):
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="block w-full mt-1 rounded-md bg-zinc-700 border-zinc-600 text-zinc-200"
                required
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-200">
              Days per Week:
              <select
                name="daysPerWeek"
                value={formData.daysPerWeek}
                onChange={handleChange}
                className="block w-full mt-1 rounded-md bg-zinc-700 border-zinc-600 text-zinc-200"
              >
                <option value="2">2 days</option>
                <option value="3">3 days</option>
                <option value="4">4 days</option>
                <option value="5">5 days</option>
              </select>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-200">
              Fitness Level:
              <select
                name="fitnessLevel"
                value={formData.fitnessLevel}
                onChange={handleChange}
                className="block w-full mt-1 rounded-md bg-zinc-700 border-zinc-600 text-zinc-200"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </label>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-zinc-200">
              <input
                type="checkbox"
                name="hasGymAccess"
                checked={formData.hasGymAccess}
                onChange={handleChange}
                className="mr-2 text-blue-600 rounded bg-zinc-700 border-zinc-600"
              />
              Access to Gym
            </label>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <MoonLoader color="#ffffff" size={16} />
            ) : (
              'Generate Workout Plan'
            )}
          </button>
        </form>
      </Box>
    </Modal>
  );
}
