// File: /api/student/index.js
import prisma from '@/lib/prisma.mjs';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handle(req, res) {
  const session = await getServerSession(req, res, authOptions);

  switch (req.method) {
    case 'OPTIONS':
      return res.status(200).end();
    case 'GET':
      return getRecipeById(req, res, session);
    case 'DELETE':
      return deleteRecipeById(req, res, session);
    default:
      res.setHeader('Allow', ['GET', 'OPTIONS']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function getRecipeById(req, res, session) {
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const recipe = await prisma.recipe.findUnique({
      where: {
        id: Number(req.query.recipeId),
        userId: session.user.id,
      },
    });
    return res.status(200).json({ recipe });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function deleteRecipeById(req, res, session) {
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // First, find the recipe to ensure it belongs to the user
    const recipe = await prisma.recipe.findUnique({
      where: {
        id: Number(req.query.recipeId),
      },
    });

    console.log('recipe from deleteRecipeById:');
    console.log(recipe);

    // If no recipe is found or the recipe does not belong to the user, return an error
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    if (recipe.userId !== session.user.id) {
      return res.status(404).json({ error: 'Not unauthorized' });
    }

    // If the recipe is found and belongs to the user, proceed to delete
    const deleteResult = await prisma.recipe.delete({
      where: {
        id: Number(req.query.recipeId),
      },
    });

    return res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
