import { PrismaClient, Board, Column, Task } from '@prisma/client'
import type { GetStaticProps } from 'next';

interface PageProps {
  board: Board;
  columns: Column[];
  tasks: Task[];
}

interface PageParams {
  params: {
    id: string;
  }
}

export default function Page({board, columns , tasks}: PageProps){
  return (
    <div>
      <h1>{board.title}</h1>
    </div>
  )
}

export const getServerSideProps = async ({params}: PageParams) => {
  const { id } = params;
  const primsa = new PrismaClient();

  const board = await primsa.board.findUnique({ where: { id: Number(id) } });
  const columns = await primsa.column.findMany({ where: { boardId: Number(id) } });
  const tasks = await primsa.task.findMany({ where: { boardId: Number(id) } });

  return {
    props: { board, columns, tasks }
  }
}
