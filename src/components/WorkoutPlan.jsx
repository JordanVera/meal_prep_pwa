// components/WorkoutPlan.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WorkoutPlan = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [workoutPlan, setWorkoutPlan] = useState([]);

  const fetchWorkoutPlan = async () => {
    try {
      const response = await axios.get(
        'https://exercisedb.p.rapidapi.com/exercises',
        {
          headers: {
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
            'X-RapidAPI-Key':
              '64011a221amshffccf812179bc65p14a35cjsna87f43357c09',
          },
        }
      );
      const exercises = response.data;

      // Simple logic to personalize based on weight and height
      // const personalizedPlan = exercises.filter((exercise) => {
      //   // Example: Filter exercises based on user weight/height
      //   return weight < 200
      //     ? exercise.bodyPart === 'cardio'
      //     : exercise.bodyPart === 'strength';
      // });

      // setWorkoutPlan(personalizedPlan.slice(0, 10)); // Take top 10 exercises
      setWorkoutPlan(exercises);
    } catch (error) {
      console.error('Error fetching workout plan:', error);
    }
  };

  useEffect(() => {
    console.log({ workoutPlan });
  }, [workoutPlan]);

  return (
    <div>
      <h2>Get Your Personalized Workout Plan</h2>
      <div>
        <label>
          Height (cm):
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Weight (kg):
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </label>
      </div>
      <button onClick={fetchWorkoutPlan}>Get Plan</button>
      {workoutPlan.length > 0 && (
        <div>
          <h3>Your Workout Plan:</h3>

          {workoutPlan.map((exercise, index) => (
            <div key={exercise.id}>
              <div className="flex gap-5 items-center">
                <h2 className="">
                  {exercise.name} - ({exercise.target})
                </h2>
              </div>
              <img
                src={exercise.gifUrl}
                alt="My cool gif"
                className="h-[160px] w-[160px]"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkoutPlan;
