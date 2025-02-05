import exercises from '../../../data/exercises.mjs';
import prisma from '../../../lib/prisma.mjs';
import colors from 'colors';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('Starting to seed exercises...'.rainbow.bold);

    for (const exercise of exercises) {
      // Create exercise with its relations
      const newExercise = await prisma.exercise.create({
        data: {
          id: exercise.id,
          name: exercise.name,
          bodyPart: exercise.bodyPart,
          equipment: exercise.equipment,
          gifUrl: exercise.gifUrl,
          target: exercise.target,
          // Create secondary muscles
          secondaryMuscles: {
            create: exercise.secondaryMuscles.map((muscle) => ({
              name: muscle,
            })),
          },
          // Create instructions
          instructions: {
            create: exercise.instructions.map((instruction, index) => ({
              step: index + 1,
              content: instruction,
            })),
          },
        },
      });

      console.log(`Exercise ${newExercise.name} created`.cyan.bold);
    }

    console.log('Seeding completed successfully'.green.bold);
    return res.status(200).json({ message: 'Database seeded successfully' });
  } catch (error) {
    console.error('Error seeding exercises:', error);
    return res.status(500).json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
}
