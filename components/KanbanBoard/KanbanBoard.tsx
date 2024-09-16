import { useState, useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Column from './components/Column';
import { Board } from './types';

type KanbanBoardProps = {
    boardData: Board;
};

// KanbanBoard Component
const KanbanBoard: React.FC<KanbanBoardProps> = ({ boardData }) => {
    const [board, setBoard] = useState<Board>(boardData);

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const updateTaskInDatabase = async (taskId: string, columnId: string, position: number) => {
        try {
            const response = await fetch(`/api/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    columnId,
                    position,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update task');
            }

            console.log('Task updated successfully');
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

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

            // Update task position in the same column in the database
            updateTaskInDatabase(movedTask.id, sourceColumn.id, destination.index);
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

            // Update task column and position in the database
            updateTaskInDatabase(movedTask.id, destColumn.id, destination.index);
        }
    };

    if (!isMounted) {
        return null; // Avoid SSR issues
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
