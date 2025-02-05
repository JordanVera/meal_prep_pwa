// File: /api/workout-plan/index.js
import prisma from '@/lib/prisma.mjs';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handle(req, res) {
  const session = await getServerSession(req, res, authOptions);

  switch (req.method) {
    case 'OPTIONS':
      return res.status(200).end();
    case 'POST':
      return generateWorkoutPlan(req, res, session);
    default:
      res.setHeader('Allow', ['POST', 'OPTIONS']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function generateWorkoutPlan(req, res, session) {
  // if (!session) {
  //   return res.status(401).json({ error: 'Unauthorized' });
  // }

  try {
    const { height, weight, daysPerWeek, hasGymAccess, fitnessLevel } =
      req.body;

    // Validate input
    if (
      !height ||
      !weight ||
      !daysPerWeek ||
      fitnessLevel === undefined ||
      hasGymAccess === undefined
    ) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Calculate BMI and determine cardio needs
    const bmi = weight / (height / 100) ** 2;
    const bmiCategory = getBMICategory(bmi);
    const cardioMinutes = getCardioMinutes(bmiCategory);

    // Get exercises from database based on equipment availability
    const exercises = await prisma.exercise.findMany({
      where: hasGymAccess
        ? {} // All exercises
        : {
            OR: [{ equipment: 'body weight' }, { bodyPart: 'cardio' }],
          },
      include: {
        instructions: true,
        // secondaryMuscles: true,
      },
    });

    // Generate workout split based on days per week
    const workoutSplit = generateWorkoutSplit(daysPerWeek);

    // Create weekly schedule
    const weeklySchedule = workoutSplit.map((day, index) => {
      const dayExercises = selectExercisesForDay(
        exercises,
        day.focus,
        fitnessLevel,
        hasGymAccess
      );

      return {
        day: index + 1,
        focus: day.focus,
        warmup: {
          type: 'cardio',
          duration: '10 minutes',
          exercises: exercises
            .filter((ex) => ex.bodyPart === 'cardio')
            .slice(0, 2),
        },
        mainWorkout: {
          exercises: dayExercises.map((exercise) => ({
            ...exercise,
            sets: getSetsForLevel(fitnessLevel),
            reps: getRepsForLevel(fitnessLevel),
            restPeriod: getRestPeriodForLevel(fitnessLevel),
          })),
        },
        cooldown: {
          type: 'stretching',
          duration: '5 minutes',
        },
      };
    });

    return res.status(200).json({
      userMetrics: {
        height,
        weight,
        bmi,
        bmiCategory,
        recommendedCardio: `${cardioMinutes} minutes`,
      },
      weeklySchedule,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Helper functions
function getBMICategory(bmi) {
  if (bmi < 18.5) return 'underweight';
  if (bmi < 25) return 'normal';
  if (bmi < 30) return 'overweight';
  return 'obese';
}

function getCardioMinutes(bmiCategory) {
  const minutes = {
    underweight: 15,
    normal: 20,
    overweight: 30,
    obese: 40,
  };
  return minutes[bmiCategory];
}

function generateWorkoutSplit(daysPerWeek) {
  const splits = {
    2: [
      { focus: 'full_body', cardio: true },
      { focus: 'full_body', cardio: true },
    ],
    3: [
      { focus: 'push', cardio: true },
      { focus: 'pull', cardio: false },
      { focus: 'legs', cardio: true },
    ],
    4: [
      { focus: 'upper', cardio: true },
      { focus: 'lower', cardio: false },
      { focus: 'upper', cardio: false },
      { focus: 'lower', cardio: true },
    ],
    5: [
      { focus: 'push', cardio: true },
      { focus: 'pull', cardio: false },
      { focus: 'legs', cardio: true },
      { focus: 'upper', cardio: false },
      { focus: 'lower', cardio: true },
    ],
  };
  return splits[daysPerWeek] || splits[3]; // Default to 3 days if invalid input
}

function selectExercisesForDay(exercises, focus, fitnessLevel, hasGymAccess) {
  const exercisesPerWorkout = {
    beginner: 4,
    intermediate: 6,
    advanced: 8,
  };

  const targetMuscles = {
    full_body: ['chest', 'back', 'legs', 'shoulders', 'arms'],
    upper: ['chest', 'back', 'shoulders', 'arms'],
    lower: ['upper legs', 'lower legs'],
    push: ['chest', 'shoulders', 'triceps'],
    pull: ['back', 'biceps'],
    legs: ['upper legs', 'lower legs'],
  };

  const targets = targetMuscles[focus] || targetMuscles.full_body;
  const filteredExercises = exercises.filter((ex) =>
    targets.includes(ex.bodyPart)
  );

  // Randomly select exercises based on fitness level
  return shuffleArray(filteredExercises).slice(
    0,
    exercisesPerWorkout[fitnessLevel]
  );
}

function getSetsForLevel(level) {
  const sets = {
    beginner: 2,
    intermediate: 3,
    advanced: 4,
  };
  return sets[level];
}

function getRepsForLevel(level) {
  const reps = {
    beginner: '12-15',
    intermediate: '10-12',
    advanced: '8-12',
  };
  return reps[level];
}

function getRestPeriodForLevel(level) {
  const rest = {
    beginner: '90 seconds',
    intermediate: '60 seconds',
    advanced: '45 seconds',
  };
  return rest[level];
}

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}
