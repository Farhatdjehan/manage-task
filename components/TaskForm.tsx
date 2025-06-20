// src/components/TaskForm.tsx
import { useState } from "react";
import { useTaskStore } from "../stores/taskStore";
import { toast } from "react-hot-toast";
//  // Install with: npm install react-hot-toast

const defaultTask = {
  id: 1,
  title: "",
  description: "",
  completed: false,
};

export const TaskForm = () => {
  const [taskData, setTaskData] = useState(defaultTask);
  const { tasks, addTask } = useTaskStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let getLast = tasks[tasks.length - 1];
    const clone = { ...taskData };
    if (!clone.title.trim()) {
      toast.error("Title is required!");
      return;
    }
    if (getLast !== undefined) {
      clone.id = (getLast?.id ?? 0) + 1;
      addTask(clone);
      setTaskData(defaultTask);
    } else {
      addTask(clone);
      setTaskData(defaultTask);
    }

    // addTask({ title, description });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Task</h2>

      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Title *
        </label>
        <input
          id="title"
          type="text"
          name="title"
          value={taskData.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Buy groceries..."
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={taskData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Milk, eggs, bread..."
          rows={3}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add Task
      </button>
    </form>
  );
};
