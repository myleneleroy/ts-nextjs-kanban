import { useState, useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Column from './components/Column';

// Types
type ColumnType = {
    id: string;
    title: string;
    position: number;
    tasks: Array<{
        id: string; title: string; description: string | null; status: 'TODO' | 'IN_PROGRESS' | 'DONE'; updatedAt: string;
    }>;
};

type Board = {
    id: string;
    title: string;
    columns: ColumnType[];
};

type KanbanBoardProps = {
    boardData: Board;
};

// KanbanBoard Component
const KanbanBoard: React.FC<KanbanBoardProps> = ({ boardData }) => {
    const [board, setBoard] = useState<Board>(boardData);

    const [isMounted, setIsMounted] = useState(false);

    // Utiliser useEffect pour vérifier si le composant est monté côté client
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const onDragEnd = (result: DropResult) => {
        const { destination, source } = result;
        if (!destination) return;

        const sourceColumn = board?.columns.find((col) => col.id === source.droppableId);
        const destColumn = board?.columns.find((col) => col.id === destination.droppableId);

        if (!sourceColumn || !destColumn || !board) return;

        // Move task within the same column
        const sourceTasks = [...sourceColumn.tasks];
        const [movedTask] = sourceTasks.splice(source.index, 1);

        if (source.droppableId === destination.droppableId) {
            sourceTasks.splice(destination.index, 0, movedTask);
            const updatedColumn = { ...sourceColumn, tasks: sourceTasks };
            setBoard({
                ...board,
                columns: board.columns.map((col) => (col.id === updatedColumn.id ? updatedColumn : col)),
            });
        } else {
            // Move task to a different column
            const destTasks = [...destColumn.tasks];
            destTasks.splice(destination.index, 0, movedTask);
            const updatedSourceColumn = { ...sourceColumn, tasks: sourceTasks };
            const updatedDestColumn = { ...destColumn, tasks: destTasks };

            setBoard({
                ...board,
                columns: board.columns.map((col) =>
                    col.id === updatedSourceColumn.id ? updatedSourceColumn : col.id === updatedDestColumn.id ? updatedDestColumn : col
                ),
            });
        }
    };

    // Rendre le DragDropContext uniquement côté client pour éviter les différences SSR/client
    if (!isMounted) {
        return null; // Eviter le rendu côté serveur
    }

    if (!board || !board.columns) {
        return <div>Loading...</div>;
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div style={{ display: 'flex' }}>
                {board.columns.map((column) => (
                    <Column key={column.id} column={column} />
                ))}
            </div>
        </DragDropContext>
    );
};

export default KanbanBoard;

