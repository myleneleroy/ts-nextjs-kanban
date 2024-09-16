import React from "react";
import { GetServerSideProps } from 'next';
import Layout from "../components/Layout";
import { Board } from "../components/KanbanBoard/types";
import prisma from "../lib/prisma";
import List from "../components/List/List";

interface BoardsListProps {
  boards: Board[];
}

const Project: React.FC<BoardsListProps> = ({ boards }) => {
  return (
    <Layout>
      <List boards={boards} />
    </Layout>
  );
};

export default Project;

export const getServerSideProps: GetServerSideProps = async () => {
  const boards = await prisma.board.findMany();

  // Convert any Date fields to strings to avoid serialization issues
  const serializedBoards = boards.map((board) => ({
    ...board,
    createdAt: board.createdAt.toISOString(), // Convert Date to string
    updatedAt: board.updatedAt?.toISOString(), // Handle optional dates similarly
  }));

  return {
    props: { boards: serializedBoards },
  };
};