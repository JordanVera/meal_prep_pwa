import { useState, useEffect } from 'react';
import axios from 'axios';
import { Delete as ClearIcon, Save as SaveIcon } from '@mui/icons-material';

import { BicepsFlexed, Target, Cog } from 'lucide-react';

const discover = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [workoutPlan, setWorkoutPlan] = useState([
    {
      bodyPart: 'waist',
      equipment: 'body weight',
      gifUrl: 'https://v2.exercisedb.io/image/ELRMrE5Yzq9VOc',
      id: '0001',
      name: '3/4 sit-up',
      target: 'abs',
      secondaryMuscles: ['hip flexors', 'lower back'],
      instructions: [
        'Lie flat on your back with your knees bent and feet flat on the ground.',
        'Place your hands behind your head with your elbows pointing outwards.',
        'Engaging your abs, slowly lift your upper body off the ground, curling forward until your torso is at a 45-degree angle.',
        'Pause for a moment at the top, then slowly lower your upper body back down to the starting position.',
        'Repeat for the desired number of repetitions.',
      ],
    },
    {
      bodyPart: 'waist',
      equipment: 'body weight',
      gifUrl: 'https://v2.exercisedb.io/image/Oj3VwsccNM4jBY',
      id: '0002',
      name: '45° side bend',
      target: 'abs',
      secondaryMuscles: ['obliques'],
      instructions: [
        'Stand with your feet shoulder-width apart and your arms extended straight down by your sides.',
        'Keeping your back straight and your core engaged, slowly bend your torso to one side, lowering your hand towards your knee.',
        'Pause for a moment at the bottom, then slowly return to the starting position.',
        'Repeat on the other side.',
        'Continue alternating sides for the desired number of repetitions.',
      ],
    },
    {
      bodyPart: 'waist',
      equipment: 'body weight',
      gifUrl: 'https://v2.exercisedb.io/image/plBJBERwu7SwzO',
      id: '0003',
      name: 'air bike',
      target: 'abs',
      secondaryMuscles: ['hip flexors'],
      instructions: [
        'Lie flat on your back with your hands placed behind your head.',
        'Lift your legs off the ground and bend your knees at a 90-degree angle.',
        'Bring your right elbow towards your left knee while simultaneously straightening your right leg.',
        'Return to the starting position and repeat the movement on the opposite side, bringing your left elbow towards your right knee while straightening your left leg.',
        'Continue alternating sides in a pedaling motion for the desired number of repetitions.',
      ],
    },
    {
      bodyPart: 'waist',
      equipment: 'body weight',
      gifUrl: 'https://v2.exercisedb.io/image/CFBYeeXxgkWphy',
      id: '0006',
      name: 'alternate heel touchers',
      target: 'abs',
      secondaryMuscles: ['obliques'],
      instructions: [
        'Lie flat on your back with your knees bent and feet flat on the ground.',
        'Extend your arms straight out to the sides, parallel to the ground.',
        'Engaging your abs, lift your shoulders off the ground and reach your right hand towards your right heel.',
        'Return to the starting position and repeat on the left side, reaching your left hand towards your left heel.',
        'Continue alternating sides for the desired number of repetitions.',
      ],
    },
    {
      bodyPart: 'back',
      equipment: 'cable',
      gifUrl: 'https://v2.exercisedb.io/image/lGot2TkGfIYUUt',
      id: '0007',
      name: 'alternate lateral pulldown',
      target: 'lats',
      secondaryMuscles: ['biceps', 'rhomboids'],
      instructions: [
        'Sit on the cable machine with your back straight and feet flat on the ground.',
        'Grasp the handles with an overhand grip, slightly wider than shoulder-width apart.',
        'Lean back slightly and pull the handles towards your chest, squeezing your shoulder blades together.',
        'Pause for a moment at the peak of the movement, then slowly release the handles back to the starting position.',
        'Repeat for the desired number of repetitions.',
      ],
    },
    {
      bodyPart: 'chest',
      equipment: 'leverage machine',
      gifUrl: 'https://v2.exercisedb.io/image/YfPPeZYdFmzEM3',
      id: '0009',
      name: 'assisted chest dip (kneeling)',
      target: 'pectorals',
      secondaryMuscles: ['triceps', 'shoulders'],
      instructions: [
        'Adjust the machine to your desired height and secure your knees on the pad.',
        'Grasp the handles with your palms facing down and your arms fully extended.',
        'Lower your body by bending your elbows until your upper arms are parallel to the floor.',
        'Pause for a moment, then push yourself back up to the starting position.',
        'Repeat for the desired number of repetitions.',
      ],
    },
    {
      bodyPart: 'waist',
      equipment: 'assisted',
      gifUrl: 'https://v2.exercisedb.io/image/etLEhmwzzZ7Vun',
      id: '0010',
      name: 'assisted hanging knee raise with throw down',
      target: 'abs',
      secondaryMuscles: ['hip flexors', 'lower back'],
      instructions: [
        'Hang from a pull-up bar with your arms fully extended and your palms facing away from you.',
        'Engage your core and lift your knees towards your chest, keeping your legs together.',
        'Once your knees are at chest level, explosively throw your legs down towards the ground, extending them fully.',
        'Allow your legs to swing back up and repeat the movement for the desired number of repetitions.',
      ],
    },
    {
      bodyPart: 'waist',
      equipment: 'assisted',
      gifUrl: 'https://v2.exercisedb.io/image/ZCcIuR7oPvDSWt',
      id: '0011',
      name: 'assisted hanging knee raise',
      target: 'abs',
      secondaryMuscles: ['hip flexors'],
      instructions: [
        'Hang from a pull-up bar with your arms fully extended and your palms facing away from you.',
        'Engage your core muscles and lift your knees towards your chest, bending at the hips and knees.',
        'Pause for a moment at the top of the movement, squeezing your abs.',
        'Slowly lower your legs back down to the starting position.',
        'Repeat for the desired number of repetitions.',
      ],
    },
    {
      bodyPart: 'waist',
      equipment: 'assisted',
      gifUrl: 'https://v2.exercisedb.io/image/GeeuPc39e0xyS2',
      id: '0012',
      name: 'assisted lying leg raise with lateral throw down',
      target: 'abs',
      secondaryMuscles: ['hip flexors', 'obliques'],
      instructions: [
        'Lie flat on your back with your legs extended and your arms by your sides.',
        'Place your hands under your glutes for support.',
        'Engage your abs and lift your legs off the ground, keeping them straight.',
        'While keeping your legs together, lower them to one side until they are a few inches above the ground.',
        'Pause for a moment, then lift your legs back to the starting position.',
        'Repeat the movement to the other side.',
        'Continue alternating sides for the desired number of repetitions.',
      ],
    },
    {
      bodyPart: 'waist',
      equipment: 'assisted',
      gifUrl: 'https://v2.exercisedb.io/image/SRUsozwJIHxBw3',
      id: '0013',
      name: 'assisted lying leg raise with throw down',
      target: 'abs',
      secondaryMuscles: ['hip flexors', 'quadriceps'],
      instructions: [
        'Lie flat on your back with your legs extended and your arms by your sides.',
        'Place your hands under your glutes for support.',
        'Engage your core and lift your legs off the ground, keeping them straight.',
        'Raise your legs until they are perpendicular to the ground.',
        'Lower your legs back down to the starting position.',
        'Simultaneously, throw your legs down towards the ground, keeping them straight.',
        'Raise your legs back up to the starting position.',
        'Repeat for the desired number of repetitions.',
      ],
    },
  ]);

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
    <div className="min-h-screen p-8 ">
      <div className="mx-auto max-w-7xl">
        {workoutPlan.length === 0 && (
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

        {workoutPlan.length > 0 && (
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

export default discover;
