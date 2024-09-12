import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (req.method === 'GET') {
        const board = await prisma.board.findUnique({
            where: { id: String(id) },
            include: {
                columns: {
                    include: {
                        tasks: true,
                    },
                },
            },
        });

        if (!board) {
            return res.status(404).json({ message: 'Board not found' });
        }

        return res.status(200).json(board);
    }

    return res.status(405).json({ message: 'Method not allowed' });
}
