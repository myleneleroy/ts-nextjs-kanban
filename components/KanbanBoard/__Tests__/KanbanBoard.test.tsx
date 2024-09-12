import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import KanbanBoard from '../KanbanBoard';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

// Mock de `react-beautiful-dnd`
jest.mock('react-beautiful-dnd', () => ({
    ...jest.requireActual('react-beautiful-dnd'),
    DragDropContext: ({ children, onDragEnd }: { children: React.ReactNode; onDragEnd: (result: DropResult) => void }) => (
        <div onDragEnd={() => onDragEnd({ destination: { droppableId: 'column-2', index: 0 }, source: { droppableId: 'column-1', index: 0 } })}>
            {children}
        </div>
    ),
}));

// Mock du composant `Column`
jest.mock('../components/Column', () => ({ column }: { column: any }) => (
    <div data-testid={`column-${column.id}`}>
        <h3>{column.title}</h3>
        <div>{column.tasks.map((task: any) => <div key={task.id}>{task.title}</div>)}</div>
    </div>
));

// Données factices pour le test
const boardData = {
    id: 'board-1',
    title: 'Test Board',
    columns: [
        {
            id: 'column-1',
            title: 'To Do',
            position: 1,
            tasks: [
                {
                    id: 'task-1',
                    title: 'Task 1',
                    description: null,
                    status: 'TODO' as 'TODO',
                    updatedAt: '2024-09-12T08:26:30.061Z',
                },
            ],
        },
        {
            id: 'column-2',
            title: 'In Progress',
            position: 2,
            tasks: [
                {
                    id: 'task-2',
                    title: 'Task 2',
                    description: null,
                    status: 'IN_PROGRESS' as 'IN_PROGRESS',
                    updatedAt: '2024-09-12T08:26:30.061Z',
                },
            ],
        },
    ],
};

describe('KanbanBoard Component', () => {
    it('renders the Kanban board with columns and tasks', () => {
        render(<KanbanBoard boardData={boardData} />);

        // Vérifier que les colonnes sont bien rendues
        expect(screen.getByTestId('column-column-1')).toBeInTheDocument();
        expect(screen.getByTestId('column-column-2')).toBeInTheDocument();

        // Vérifier que les tâches sont bien affichées dans chaque colonne
        expect(screen.getByText('Task 1')).toBeInTheDocument();
        expect(screen.getByText('Task 2')).toBeInTheDocument();
    });

    it('simulates drag and drop between columns', () => {
        const { getByTestId } = render(<KanbanBoard boardData={boardData} />);

        // Simuler l'événement de drag-and-drop en utilisant fireEvent
        const column1 = getByTestId('column-column-1');
        const column2 = getByTestId('column-column-2');

        // Simuler le drag-and-drop (mocké dans DragDropContext)
        fireEvent.dragEnd(column1);

        // Vérifiez que la tâche a été déplacée dans la colonne 2 (logique simulée)
        expect(column2).toContainElement(screen.getByText('Task 1'));
    });
});
