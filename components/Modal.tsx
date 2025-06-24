import { useTaskStore } from "@/stores/taskStore";
import dayjs from "dayjs";
import { useState } from "react";
import { toast } from "react-hot-toast";

type Task = {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  pic: string[];
  completed: boolean;
};

const defaultTask: Task = {
  id: 1,
  title: "",
  description: "",
  start_date: dayjs().format("YYYY-MM-DD"),
  end_date: "",
  pic: [],
  completed: false,
};

type ModalProps = {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
};

export default function Modal(props: ModalProps) {
  const { openModal, setOpenModal } = props;
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
    if(clone.pic.length === 0) {
       toast.error("PIC is required!");
      return;
    }
    if (getLast !== undefined) {
      clone.id = (getLast?.id ?? 0) + 1;
      if (!clone.end_date) {
        clone.end_date = dayjs().format("YYYY-MM-DD");
      }
      addTask(clone);
    } else {
      addTask(clone);
    }
    setTaskData(defaultTask);
    setOpenModal(!openModal);

    // addTask({ title, description });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const input = e.target as HTMLInputElement;
      setTaskData((prev) => {
        let newPic = Array.isArray(prev.pic) ? [...prev.pic] : [];
        if (input.checked) {
          newPic.push(value);
        } else {
          newPic = newPic.filter((v) => v !== value);
        }
        return { ...prev, pic: newPic };
      });
    } else {
      setTaskData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div
      className="relative z-10"
      aria-labelledby="dialog-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-800/75 transition-opacity"
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <form onSubmit={handleSubmit}>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start ">
                  {/* <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                  <svg
                    className="size-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                    />
                  </svg>
                </div> */}
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3
                      className="text-base font-semibold text-gray-900"
                      id="dialog-title"
                    >
                      Add New Task
                    </h3>
                    <div className="mt-2">
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
                      <div className="flex gap-4 mb-4">
                        <div className="w-1/2">
                          <label
                            htmlFor="start_date"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Start Date
                          </label>
                          <input
                            id="start_date"
                            type="date"
                            name="start_date"
                            value={taskData.start_date}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="w-1/2">
                          <label
                            htmlFor="end_date"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            End Date
                          </label>
                          <input
                            id="end_date"
                            type="date"
                            name="end_date"
                            value={taskData.end_date}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          PIC *
                        </label>
                        <input
                          type="checkbox"
                          id="user1"
                          name="pic"
                          value="User 1"
                          checked={
                            Array.isArray(taskData.pic) &&
                            taskData.pic.includes("User 1")
                          }
                          onChange={handleChange}
                        />
                        <label htmlFor="user1" className="ms-2">
                          User 1
                        </label>
                        <br />
                        <input
                          type="checkbox"
                          id="user2"
                          name="pic"
                          value="User 2"
                          checked={
                            Array.isArray(taskData.pic) &&
                            taskData.pic.includes("User 2")
                          }
                          onChange={handleChange}
                        />
                        <label htmlFor="user2" className="ms-2">
                          User 2
                        </label>
                        <br />
                        <input
                          type="checkbox"
                          id="user3"
                          name="pic"
                          value="User 3"
                          checked={
                            Array.isArray(taskData.pic) &&
                            taskData.pic.includes("User 3")
                          }
                          onChange={handleChange}
                        />
                        <label htmlFor="user3" className="ms-2">
                          User 3
                        </label>
                        <br />
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
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="submit"
                  className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 sm:ml-3 sm:w-auto"
                >
                  Add Task
                </button>
                <button
                  onClick={() => setOpenModal(!openModal)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
