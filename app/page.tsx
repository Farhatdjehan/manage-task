"use client";

import Modal from "@/components/Modal";
import { PDFButton } from "@/components/PDFReport";
import { TaskList } from "@/components/TaskList";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useTaskStore } from "@/stores/taskStore";

export default function Home() {
  const { tasks, fetchTasks } = useTaskStore();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleModal = () => {
    setOpenModal((prev: boolean) => !prev);
  };
  return (
    <div className="max-w-2xl mx-auto p-4 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <h2 className="text-[2rem] font-bold">Task</h2>
        <div className="flex gap-4 items-center justify-between md:justify-center">
          {tasks?.length > 0 && <PDFButton />}
          <button
            onClick={handleModal}
            className="inline-flex md:w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 sm:ml-3 sm:w-auto"
          >
            Add Task
          </button>
        </div>
      </div>
      <TaskList />
      <Toaster />
      {openModal && <Modal openModal={openModal} setOpenModal={setOpenModal} />}
    </div>
  );
}
