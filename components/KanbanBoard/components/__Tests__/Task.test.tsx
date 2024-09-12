import React, { act } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Task from '../Task';
import { Draggable } from 'react-beautiful-dnd';

// Mock de `Draggable` de `react-beautiful-dnd`
jest.mock('react-beautiful-dnd', () => ({
    Draggable: ({ children }: any) => (
        <div>{children({ draggableProps: {}, dragHandleProps: {}, innerRef: jest.fn() })}</div>
    ),
}));

// Données factices pour le test
const taskData = {
    id: 'task-1',
    title: 'Task 1',
    description: 'This is the first task',
    status: 'TODO' as 'TODO',
    updatedAt: '2024-09-12T08:26:30.061Z',
};

describe('Task Component', () => {
    it('renders the task with correct title, description, and updated date', async () => {
        // Utilisation de `act` pour encapsuler l'appel asynchrone
        await act(async () => {
            render(<Task task={taskData} index={0} />);
        });

        // Vérifier que le titre de la tâche est bien affiché
        expect(screen.getByText('Task 1')).toBeInTheDocument();

        // Vérifier que la description de la tâche est bien affichée
        expect(screen.getByText('This is the first task')).toBeInTheDocument();

        // Vérifier que la date de mise à jour est bien formatée
        expect(screen.getByText('Updated At:')).toBeInTheDocument();
        expect(screen.getByText('9/12/2024')).toBeInTheDocument(); // Formate la date au format local
    });

    it('renders the default message when description is null', async () => {
        const taskWithoutDescription = { ...taskData, description: null };

        await act(async () => {
            render(<Task task={taskWithoutDescription} index={0} />);
        });

        // Vérifier que le texte par défaut pour la description est affiché
        expect(screen.getByText('No description available')).toBeInTheDocument();
    });
});
