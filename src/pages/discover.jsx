import { useState, useEffect } from 'react';

import { Delete as ClearIcon, Save as SaveIcon } from '@mui/icons-material';
import useExerciseData from '@/hooks/useExerciseData';
import ExerciseService from '@/services/ExerciseService';
import { BicepsFlexed, Target, Cog } from 'lucide-react';

const Discover = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [exerciseData, setExerciseData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // const { bodyParts } = useExerciseData();

  const fetchExercises = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await ExerciseService.getExercises();
      // const sortedExercises = data.sort((a, b) => {
      //   return a.bodyPart.localeCompare(b.bodyPart);
      // });

      setExerciseData(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching exercises:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWorkoutPlan = async () => {
    try {
      // Simple logic to personalize based on weight and height
      // const personalizedPlan = exercises.filter((exercise) => {
      //   // Example: Filter exercises based on user weight/height
      //   return weight < 200
      //     ? exercise.bodyPart === 'cardio'
      //     : exercise.bodyPart === 'strength';
      // });
      // setWorkoutPlan(personalizedPlan.slice(0, 10)); // Take top 10 exercises
    } catch (error) {
      console.error('Error fetching workout plan:', error);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  useEffect(() => {
    console.log({ exerciseData });
  }, [exerciseData]);

  return (
    <div className="min-h-screen p-8 ">
      <div className="mx-auto max-w-7xl">
        {exercises.length === 0 && (
          <section>
            <h2 className="mb-8 text-3xl font-bold text-center text-white">
              Get Your Personalized Workout Plan
            </h2>

            <div className="p-6 mb-8 rounded-lg shadow-md bg-zinc-800">
              <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-zinc-200">
                    Height (cm):
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="block w-full mt-1 rounded-md shadow-sm text-zinc-200 bg-zinc-700 border-zinc-600 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </label>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-zinc-200">
                    Weight (kg):
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="block w-full mt-1 rounded-md shadow-sm text-zinc-200 bg-zinc-700 border-zinc-600 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </label>
                </div>
              </div>
              <button
                onClick={fetchWorkoutPlan}
                className="w-full px-4 py-2 text-white transition-colors duration-200 bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Get Plan
              </button>
            </div>
          </section>
        )}

        {exercises.length > 0 && (
          <div>
            <header className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-white ">
                Your Workout Plan
              </h3>

              <div className="flex gap-2">
                <button
                  onClick={() => setWorkoutPlan([])}
                  className="flex items-center gap-2 px-4 py-2 text-white transition-colors duration-200 bg-red-600 rounded-md hover:bg-red-700"
                >
                  <ClearIcon className="w-5 h-5" />
                  Clear Plan
                </button>
                <button
                  onClick={() => saveWorkoutPlan()}
                  className="flex items-center gap-2 px-4 py-2 text-white transition-colors duration-200 bg-green-600 rounded-md hover:bg-green-700"
                >
                  <SaveIcon className="w-5 h-5" />
                  Save Plan
                </button>
              </div>
            </header>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {workoutPlan.map((exercise) => (
                <div
                  key={exercise.id}
                  className="overflow-hidden transition-shadow duration-200 rounded-lg shadow-md bg-zinc-800 hover:shadow-blue-900/50 hover:shadow-lg"
                >
                  <div className="p-4">
                    <h2 className="mb-2 text-xl font-semibold text-white">
                      {exercise.name}
                    </h2>
                  </div>
                  <div className="flex justify-center p-4 bg-zinc-700">
                    <img
                      src={exercise.gifUrl}
                      alt={`${exercise.name} demonstration`}
                      className="object-cover w-48 h-48 rounded"
                    />
                  </div>

                  {exercise.instructions && (
                    <div className="p-4 border-t border-zinc-700">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-purple-500/30 w-fit">
                          <Target className="w-4 h-4 text-purple-500" />
                          <p className="text-xs text-purple-500">
                            {exercise.target}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-orange-500/30 w-fit">
                          <BicepsFlexed className="w-4 h-4 text-orange-500" />
                          <p className="text-xs text-orange-500">
                            {exercise.bodyPart}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-green-500/30 w-fit">
                          <Cog className="w-4 h-4 text-green-500" />
                          <p className="text-xs text-green-500">
                            {exercise.equipment}
                          </p>
                        </div>
                      </div>

                      <ol className="space-y-1 text-sm list-decimal list-inside text-zinc-300">
                        {exercise.instructions.map((instruction, idx) => (
                          <li key={idx} className="text-xs">
                            {instruction}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Discover;
