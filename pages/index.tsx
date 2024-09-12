import React from "react";
import { GetServerSideProps } from 'next';
import Layout from "../components/Layout";
import KanbanBoard from '../components/KanbanBoard';

type Task = {
  id: string;
  title: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  position: number;
};

type ColumnType = {
  id: string;
  title: string;
  position: number;
  tasks: Task[];
};

type Board = {
  id: string;
  title: string;
  columns: ColumnType[];
};

type KanbanBoardProps = {
  boardData: Board;
};

const Project: React.FC<KanbanBoardProps> = ({ boardData }) => {
  return (
    <Layout>
      <h1>Kanban Board</h1>
      <KanbanBoard boardData={boardData} />
    </Layout>
  );
};

export default Project;

export const getServerSideProps: GetServerSideProps = async () => {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000'; // Utilise localhost en développement

  // Fetch data from the API or database on the server side
  const response = await fetch(`${baseUrl}/api/boards/cm0z0znsd0000s59zki9sq44w`);
  const boardData: Board = await response.json();

  return {
    props: {
      boardData, // Passed as a prop to the page
    },
  };
};