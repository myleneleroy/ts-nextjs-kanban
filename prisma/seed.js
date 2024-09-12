import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Créer un tableau Kanban initial avec des colonnes et des tâches
    await prisma.board.create({
        data: {
            title: 'Project Sprint Board',
            columns: {
                create: [
                    {
                        title: 'To Do',
                        position: 1,
                        tasks: {
                            create: [
                                {
                                    title: 'Implement feature A',
                                    status: 'TODO',
                                    position: 1,
                                },
                                {
                                    title: 'Fix bug B',
                                    status: 'IN_PROGRESS',
                                    position: 2,
                                },
                            ],
                        },
                    },
                    {
                        title: 'In Progress',
                        position: 2,
                        tasks: {
                            create: [
                                {
                                    title: 'Review pull requests',
                                    status: 'IN_PROGRESS',
                                    position: 1,
                                },
                            ],
                        },
                    },
                    {
                        title: 'Done',
                        position: 3,
                        tasks: {
                            create: [
                                {
                                    title: 'Write documentation',
                                    status: 'DONE',
                                    position: 1,
                                },
                            ],
                        },
                    },
                ],
            },
        },
    });
}

main()
    .then(() => {
        console.log('Data seeded successfully');
    })
    .catch((e) => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

export { };
