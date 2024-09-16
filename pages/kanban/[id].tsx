import React from "react";
import { GetServerSideProps } from 'next';
import Layout from "../../components/Layout";
import KanbanBoard from '../../components/KanbanBoard';
import { Board } from "../../components/KanbanBoard/types";

type KanbanBoardProps = {
    boardData: Board;
};

const Project: React.FC<KanbanBoardProps> = ({ boardData }) => {
    return (
        <Layout>
            <KanbanBoard boardData={boardData} />
        </Layout>
    );
};

export default Project;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000'; // Utilise localhost en développement

    // Fetch data from the API or database on the server side
    const response = await fetch(`${baseUrl}/api/boards/${params.id}`);
    const boardData: Board = await response.json();

    return {
        props: {
            boardData, // Passed as a prop to the page
        },
    };
};