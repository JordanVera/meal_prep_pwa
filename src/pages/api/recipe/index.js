// pages/api/save-recipe.js
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const {
    title,
    servings,
    calories,
    cookTime,
    instructions,
    image,
    sourceUrl,
    sourceName,
    steps,
  } = req.body;

  try {
    const recipe = await prisma.recipe.create({
      data: {
        title,
        servings: parseInt(servings, 10),
        calories: parseInt(calories, 10),
        readyInMinutes: parseInt(cookTime, 10),
        instructions,
        image,
        sourceUrl,
        sourceName,
        user: {
          connect: { email: session.user.email },
        },
      },
    });

    steps.map(async (step) => {
      await prisma.recipe_step.create({
        data: {
          recipeId: recipe.id,
          step: step.content,
          recipeId: recipe.id,
        },
      });
    });

    res.status(200).json({ recipe });
  } catch (error) {
    console.error('Failed to save recipe:', error);
    res.status(500).json({ error: 'Failed to save recipe' });
  }
}
