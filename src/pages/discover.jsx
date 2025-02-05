import { useState, useEffect } from 'react';

import { Delete as ClearIcon, Save as SaveIcon } from '@mui/icons-material';
import useExerciseData from '@/hooks/useExerciseData';
import ExerciseService from '@/services/ExerciseService';
import ExerciseCard from '@/components/cards/ExerciseCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Skeleton } from '@mui/material';

const Discover = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [exerciseData, setExerciseData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  // const { bodyParts } = useExerciseData();

  const fetchExercises = async (page = 1) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await ExerciseService.getExercises(page, itemsPerPage);
      setExerciseData(data.exercises);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching exercises:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExercises(currentPage);
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    console.log({ exerciseData });
  }, [exerciseData]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const PaginationControls = () => {
    if (!pagination) return null;

    return (
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 text-white transition-colors duration-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-700"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-xs text-white">
          Page {currentPage} of {pagination.totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === pagination.totalPages}
          className="p-2 text-white transition-colors duration-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-700"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        <select
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="px-3 py-2 text-xs text-white border rounded-md bg-zinc-800 border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={10}>10 per page</option>
          <option value={25}>25 per page</option>
          <option value={50}>50 per page</option>
          <option value={100}>100 per page</option>
        </select>
      </div>
    );
  };

  if (isLoading) {
    return <LoadingSkeletons />;
  }

  return (
    <div>
      <header className="flex items-center justify-between px-5 py-2 border-b border-zinc-600 bg-zinc-800">
        <h1>Exercises</h1>
        <PaginationControls />
      </header>
      <main className="p-5 mx-auto">
        {/* <section>
          <h2 className="mb-8 text-3xl font-bold text-white">
            Generate Personalized Workout Plan
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
        </section> */}

        {exerciseData?.length > 0 && (
          <div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {exerciseData?.map((exercise) => (
                <ExerciseCard key={exercise.id} exercise={exercise} />
              ))}
            </div>
            <div className="mt-8">
              <PaginationControls />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const LoadingSkeletons = () => {
  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div className="overflow-hidden transition-shadow duration-200 rounded-lg shadow-md bg-zinc-800">
              <div className="flex justify-center bg-zinc-700">
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={200}
                  sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }}
                />
              </div>
              <div className="p-4 border-t border-zinc-700">
                <Skeleton
                  variant="text"
                  width="80%"
                  height={32}
                  sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }}
                />
                <div className="flex items-center gap-2 mb-4">
                  {[1, 2, 3].map((i) => (
                    <Skeleton
                      key={i}
                      variant="rounded"
                      width={80}
                      height={24}
                      sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }}
                    />
                  ))}
                </div>
                {[1, 2, 3].map((i) => (
                  <Skeleton
                    key={i}
                    variant="text"
                    width="100%"
                    height={20}
                    sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }}
                    className="mb-1"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Discover;
