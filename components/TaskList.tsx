// src/components/TaskList.tsx
import { useTaskStore } from "../stores/taskStore";
import { TaskItem } from "./TaskItem";

export const TaskList = () => {
  const { tasks } = useTaskStore();

  return (
    <div className="space-y-4">
      {tasks?.length > 0 ? (
        tasks.map((task) => <TaskItem key={task.id} task={task} />)
      ) : (
        <div className="text-sm text-center">No Task Found</div>
      )}
    </div>
  );
};
