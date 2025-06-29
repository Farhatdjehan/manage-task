// src/stores/taskStore.ts
import { create } from "zustand";

// Types
interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  start_date: string;
  end_date: string;
  pic: string[];
}

interface TaskStore {
  tasks: Task[];
  pdfReady: boolean;
  setPdfReady: (ready: boolean) => void;
  fetchTasks: () => Promise<void>;
  addTask: (task: Task) => Promise<void>;
  toggleTask: (id: number) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
}

const dummyTasks: Task[] = [
  {
    id: 1,
    title: "Dummy Task 1",
    description: "Description 1",
    completed: false,
    start_date: "2025-06-12",
    end_date: "2025-06-13",
    pic: ["User 1", "User 2"],
  },
  {
    id: 2,
    title: "Dummy Task 2",
    description: "Description 2",
    completed: false,
    start_date: "2025-06-12",
    end_date: "2025-06-13",
    pic: ["User 1"],
  },
];

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  pdfReady: false,
  setPdfReady: (ready) => set({ pdfReady: ready }),
  // Fetch all tasks
  fetchTasks: () => {
    set({ tasks: dummyTasks });
    return Promise.resolve();
  },
  // Add new task
  addTask: (task) => {
    set((state) => ({ tasks: [...state.tasks, task] }));
    return Promise.resolve();
  },

  // Toggle task completion status
  toggleTask: (id: number) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    }));
    return Promise.resolve();
  },

  // Delete task
  deleteTask: (id: number) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));
    return Promise.resolve();
  },
}));
