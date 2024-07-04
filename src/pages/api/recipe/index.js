import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

// pages/api/save-recipe.js

const prisma = new PrismaClient();

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return handlePostRequest(req, res);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}

async function handlePostRequest(req, res) {
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
    ingredients,
  } = req.body;

  console.log('INGREDIENTS:');
  console.log(ingredients);

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

    steps.map(async (step, index) => {
      await prisma.step.create({
        data: {
          recipeId: recipe.id,
          step: index + 1,
          recipeId: recipe.id,
          content: step,
        },
      });
    });

    ingredients.map(async (ingredient, index) => {
      await prisma.ingredient.create({
        data: {
          recipeId: recipe.id,
          name: ingredient.originalName,
          amount_us: ingredient.measures.us.amount,
          amount_metric: ingredient.measures.metric.amount,
          unitShort_us: ingredient.measures.us.unitShort,
          unitShort_metric: ingredient.measures.metric.unitShort,
          unitLong_us: ingredient.measures.us.unitLong,
          unitLong_metric: ingredient.measures.metric.unitLong,
        },
      });
    });

    res.status(200).json({ recipe });
  } catch (error) {
    console.error('Failed to save recipe:', error);
    res.status(500).json({ error: 'Failed to save recipe' });
  }
}
