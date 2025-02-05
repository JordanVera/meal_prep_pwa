import { useState, useEffect } from 'react';
import ExerciseService from '@/services/ExerciseService';

const useExerciseData = () => {
  const [bodyParts, setBodyParts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBodyParts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await ExerciseService.getBodyParts();
      setBodyParts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBodyParts();
  }, []);

  useEffect(() => {
    console.log({ bodyParts });
  }, [bodyParts]);

  return {
    bodyParts,
    isLoading,
    error,

    refetchBodyParts: fetchBodyParts,
  };
};

export default useExerciseData;
