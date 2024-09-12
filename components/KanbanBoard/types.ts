export type Task = {
    id: string;
    title: string;
    status: 'TODO' | 'IN_PROGRESS' | 'DONE';
    position: number;
};

export type ColumnType = {
    id: string;
    title: string;
    position: number;
    tasks: Array<{
        id: string; title: string; description: string | null; status: 'TODO' | 'IN_PROGRESS' | 'DONE'; updatedAt: string;
    }>;
};

export type Board = {
    id: string;
    title: string;
    columns: ColumnType[];
};

