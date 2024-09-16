export type Task = {
    id: string;
    title: string;
    position: number;
};

export type ColumnType = {
    id: string;
    title: string;
    position: number;
    tasks: Array<{
        id: string; title: string; description: string | null; updatedAt: string;
    }>;
};

export type Board = {
    id: string;
    title: string;
    columns: ColumnType[];
    createdAt: string;
};

