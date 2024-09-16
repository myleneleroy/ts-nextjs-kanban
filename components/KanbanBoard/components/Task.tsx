import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

type TaskProps = {
    task: {
        id: string;
        title: string;
        description: string | null;
        updatedAt: string;
    };
    index: number;
};

const Task: React.FC<TaskProps> = ({ task, index }) => {
    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided) => (
                <div
                    className='mb-2'
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    <div
                        className="block max-w-[18rem] rounded-lg border bg-white text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white">
                        <div className="border-b-2 border-neutral-100 px-6 py-3 dark:border-white/10">{task.title}</div>
                        <div className="p-6">
                            <p className="text-base text-success-600">
                                {task.description || 'No description available'}
                            </p>
                        </div>
                        <div className="border-t-2 border-success-600 px-6 py-3 text-xs text-slate-500">{new Date(task.updatedAt).toLocaleDateString()}</div>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default Task;
