import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styles from './Task.module.css';

type TaskProps = {
    task: {
        id: string;
        title: string;
        description: string | null;
        status: 'TODO' | 'IN_PROGRESS' | 'DONE';
        updatedAt: string;
    };
    index: number;
};

const Task: React.FC<TaskProps> = ({ task, index }) => {
    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div className={`${styles['task-card']} ${styles['task-status']} ${styles[task.status.toLowerCase()]}`}>
                        <div className={styles['task-content']}>
                            <h3 className={styles['task-title']}>{task.title}</h3>
                            <p className={styles['task-description']}>{task.description || 'No description available'}</p>
                            <div className={styles['task-meta']}>
                                <p><strong>Updated At:</strong> {new Date(task.updatedAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default Task;
