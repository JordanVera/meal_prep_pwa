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
      return getCurrentlyLoggedInUser(req, res, session);
    default:
      res.setHeader('Allow', ['GET', 'OPTIONS']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function getCurrentlyLoggedInUser(req, res, session) {
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // TODO: remove password from return
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      include: {
        recipes: {
          include: {
            Step: true,
          },
        },
      },
    });
    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
