import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const taskId = req.query.id as string;

    if (req.method === 'PUT') {
        const { columnId, position } = req.body;

        try {
            const updatedTask = await prisma.task.update({
                where: { id: taskId },
                data: {
                    columnId,
                    position,
                },
            });

            res.status(200).json(updatedTask);
        } catch (error) {
            console.error('Error updating task:', error);
            res.status(500).json({ error: 'Failed to update task' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
