import { useTaskStore } from "../stores/taskStore";
import complete from "../public/check.svg";
import deleteIcon from "../public/delete.svg";
import undoIcon from "../public/undo.svg";
import Image from "next/image";

type Task = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  pic: string[];
  start_date: string;
  end_date: string;
};

interface TaskItemProps {
  task: Task;
}

export const TaskItem = ({ task }: TaskItemProps) => {
  const { toggleTask, setPdfReady, deleteTask } = useTaskStore();

  const deleteData = (id: number) => {
    deleteTask(id);
    setPdfReady(false); // Update Zustand state
    setTimeout(() => setPdfReady(true), 0);
  };
  return (
    <div
      role="listitem"
      className={`p-4 border rounded-[1rem] shadow-sm ${"bg-white border-gray-200"}`}
    >
      <div className="border-b w-full pb-4 mb-4">
        <div>
          <h3
            className={`font-bold ${
              task.completed ? "line-through text-gray-500" : "text-gray-800"
            }`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p
              className={`text-gray-600 mt-1 mb-6 ${
                task.completed ? "line-through text-gray-500" : "text-gray-800"
              }`}
            >
              {task.description}
            </p>
          )}
        </div>
        <div className="flex justify-between">
          <div>
            <div className="text-[12px] text-gray-500">Date Start:</div>
            <strong>{task.start_date}</strong>
          </div>
          <div className="text-[14px">
            <div className="text-[12px] text-gray-500">Date End:</div>
            <strong>{task.end_date}</strong>
          </div>
        </div>
      </div>

      <div className="flex justify-between ">
        <div className="flex gap-3">
          {task.pic?.length > 0 && (
            <div className="text-[14px] text-gray-500">
              <strong>PIC</strong> : {task.pic.join(", ")}
            </div>
          )}
          <div
            className={`text-xs ${
              task.completed
                ? "text-green-800 rounded-md bg-green-400"
                : "text-yellow-800 rounded-md bg-yellow-400"
            } px-3 py-1 font-bold`}
          >
            {task.completed ? "Completed" : "Pending"}
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => toggleTask(task.id)}
            className="p-0 bg-transparent border-none focus:outline-none hover:transform hover:scale-110 transition-transform duration-200 ease-in-out"
          >
            {task.completed ? (
              <Image src={undoIcon} alt="undo" width={18} height={18} />
            ) : (
              <Image src={complete} alt="complete" width={18} height={18} />
            )}
          </button>
          <button
            onClick={() => deleteData(task.id)}
            className="p-0 bg-transparent border-none focus:outline-none hover:transform hover:scale-110 transition-transform duration-200 ease-in-out"
          >
            <Image src={deleteIcon} alt="delete" width={18} height={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
