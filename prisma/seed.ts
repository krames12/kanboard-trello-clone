import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const boardData = [
  {
    title: 'DevOps',
    columns: {
      create: [
        {
          title: 'To do',
          position: 0,
          tasks: {
            create: [
              {
                title: 'Setup CI/CD',
                position: 0
              },
              {
                title: 'Setup Docker',
                position: 1
              },
              {
                title: 'Setup Kubernetes',
                position: 2
              }
            ]
          }
        },
        {
          title: 'In progress',
          position: 1,
          tasks: {
            create: [
              {
                title: 'Create Vercel account',
                position: 0
              },
              {
                title: 'Create Docker account',
                position: 1
              }
            ]
          }
        },
        {
          title: 'Done',
          position: 2,
          tasks: {
            create: []
          }
        }
      ]
    },
  }
];

const seed = async () => {
  console.log(`Start seeding ...`);

  try {
    await prisma.board.deleteMany();
    console.log('Deleted records in board table');

    await prisma.task.deleteMany();
    console.log('Deleted records in task table');

    await prisma.column.deleteMany();
    console.log('Deleted records in column table');

    for (const board of boardData) {
      const newBoard = await prisma.board.create({
        data: {
          title: board.title
        },
      });
      console.log(`Created board with id: ${newBoard.id}`);

      for (const column of board.columns.create) {
        const newColumn = await prisma.column.create({
          data: {
            title: column.title,
            position: column.position,
            boardId: newBoard.id,
          },
        });
        console.log(`Created column with id: ${newColumn.id}`);

        for (const task of column.tasks.create) {
          const newTask = await prisma.task.create({
            data: {
              title: task.title,
              position: task.position,
              columnId: newColumn.id,
              boardId: newBoard.id,
            },
          });
          console.log(`Created task with id: ${newTask.id}`);
        }
      }
    }
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }

  console.log(`Seeding finished.`);
}

seed();
