import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Column from '../Column';
import { DragDropContext } from 'react-beautiful-dnd';

// Données factices pour le test
const columnData = {
    id: 'column-1',
    title: 'To Do',
    tasks: [
        {
            id: 'task-1',
            title: 'Task 1',
            description: null,
            status: 'TODO' as 'TODO',
            updatedAt: '2024-09-12T08:26:30.061Z',
        },
        {
            id: 'task-2',
            title: 'Task 2',
            description: null,
            status: 'IN_PROGRESS' as 'IN_PROGRESS',
            updatedAt: '2024-09-12T08:26:30.061Z',
        },
    ],
};

// Mock de react-beautiful-dnd
jest.mock('react-beautiful-dnd', () => ({
    ...jest.requireActual('react-beautiful-dnd'),
    Droppable: ({ children }) => <div>{children({ droppableProps: {}, innerRef: jest.fn(), placeholder: null })}</div>,
    Draggable: ({ children }) => <div>{children({ draggableProps: {}, dragHandleProps: {}, innerRef: jest.fn() })}</div>,
}));

describe('Column Component', () => {
    const onDragEnd = jest.fn();

    it('renders the column title and tasks', () => {
        render(
            <DragDropContext onDragEnd={onDragEnd}>
                <Column column={columnData} />
            </DragDropContext>
        );

        // Vérifier que le titre de la colonne est affiché
        expect(screen.getByText('To Do')).toBeInTheDocument();

        // Vérifier que les tâches sont bien rendues
        expect(screen.getByText('Task 1')).toBeInTheDocument();
        expect(screen.getByText('Task 2')).toBeInTheDocument();
    });
});
