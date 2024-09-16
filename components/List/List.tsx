import React from 'react';
import { Board } from "../../components/KanbanBoard/types";
import Link from 'next/link';

interface BoardsListProps {
    boards: Board[];
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

const BoardsList: React.FC<BoardsListProps> = ({ boards }) => {
    return (
        <div className="grid grid-cols-1 gap-6">
            {boards.map((board) => (
                <Link key={board.id} href={`/kanban/${board.id}`} passHref>
                    <div key={board.id} className="p-6 border rounded-lg shadow-lg bg-white hover:bg-gray-50 transition duration-200">
                        <h2 className="text-xl font-semibold mb-2 text-gray-800">{board.title}</h2>
                        <p className="text-gray-500">
                            Created on: {formatDate(board.createdAt)}
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default BoardsList;
