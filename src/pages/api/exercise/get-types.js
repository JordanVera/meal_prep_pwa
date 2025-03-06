// File: /api/exercise/index.js
import prisma from '@/lib/prisma.mjs';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handle(req, res) {
  const session = await getServerSession(req, res, authOptions);

  switch (req.method) {
    case 'OPTIONS':
      return res.status(200).end();
    case 'GET':
      return getBodyPartTypes(req, res, session);
    default:
      res.setHeader('Allow', ['GET', 'OPTIONS']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function getBodyPartTypes(req, res, session) {
  // if (!session) {
  //   return res.status(401).json({ error: 'Unauthorized' });
  // }

  try {
    const uniqueBodyParts = await prisma.exercise.findMany({
      select: {
        bodyPart: true,
      },
      distinct: ['bodyPart'],
    });

    // Transform the result to a simple array of bodyPart strings
    const bodyPartTypes = uniqueBodyParts.map((item) => item.bodyPart);

    return res.status(200).json(bodyPartTypes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
