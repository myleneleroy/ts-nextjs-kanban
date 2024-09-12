import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';

type ColumnProps = {
    column: {
        id: string;
        title: string;
        tasks: Array<{
            id: string; title: string; description: string | null; status: 'TODO' | 'IN_PROGRESS' | 'DONE'; updatedAt: string;
        }>;
    };
};

const Column: React.FC<ColumnProps> = ({ column }) => {
    return (
        <Droppable droppableId={column.id}>
            {(provided) => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{ margin: '8px', width: '300px', backgroundColor: '#f4f5f7', padding: '16px', borderRadius: '8px', flex: 1 }}
                >
                    <h3>{column.title}</h3>
                    {column.tasks.map((task, index) => (
                        <Task key={task.id} task={task} index={index} />
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default Column;
