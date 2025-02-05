import { useState, useEffect } from 'react';
import ExerciseService from '@/services/ExerciseService';

const useExerciseData = () => {
  const [exercises, setExercises] = useState([]);
  const [bodyParts, setBodyParts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchExercises = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await ExerciseService.getExercises();
      // const sortedExercises = data.sort((a, b) => {
      //   return a.bodyPart.localeCompare(b.bodyPart);
      // });

      setExercises(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching exercises:', err);
    } finally {
      setIsLoading(false);
    }
  };

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
    fetchExercises();
    fetchBodyParts();
  }, []);

  useEffect(() => {
    console.log({ exercises });
  }, [exercises]);

  useEffect(() => {
    console.log({ bodyParts });
  }, [bodyParts]);

  return {
    exercises,
    bodyParts,
    isLoading,
    error,
    refetchExercises: fetchExercises,
    refetchBodyParts: fetchBodyParts,
  };
};

export default useExerciseData;
