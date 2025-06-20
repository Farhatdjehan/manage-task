import { render, screen } from "@testing-library/react";
import { TaskList } from "./TaskList";
import { useTaskStore } from "../stores/taskStore";

type Task = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
};

// Mock the task store module
jest.mock("../stores/taskStore");
jest.mock("next/image", () => (props: { src: string; alt: string }) => (
  <img src={props.src} alt={props.alt} />
));

const mockUseTaskStore = useTaskStore as jest.MockedFunction<
  typeof useTaskStore
>;

describe("TaskList Component", () => {
  // Sample tasks data
  const sampleTasks: Task[] = [
    { id: 1, title: "Task 1", description: "Description 1", completed: false },
    { id: 2, title: "Task 2", description: "Description 2", completed: true },
  ];

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('should render "No Task Found" when tasks are empty', () => {
    // Mock the store to return empty tasks
    mockUseTaskStore.mockReturnValue({
      tasks: [],
      addTask: jest.fn(),
      updateTask: jest.fn(),
      deleteTask: jest.fn(),
    });

    render(<TaskList />);

    expect(screen.getByText(/No Task Found/i)).toBeInTheDocument();
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

  it("should render list of tasks when tasks are available", () => {
    // Mock the store to return sample tasks
    mockUseTaskStore.mockReturnValue({
      tasks: sampleTasks,
      addTask: jest.fn(),
      updateTask: jest.fn(),
      deleteTask: jest.fn(),
    });

    render(<TaskList />);

    // Check that all tasks are rendered
    expect(screen.getAllByRole("listitem")).toHaveLength(sampleTasks.length);
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
    expect(screen.queryByText(/No Task Found/i)).not.toBeInTheDocument();
  });

  it("should render TaskItem components with correct props", () => {
    // Mock the store to return sample tasks
    mockUseTaskStore.mockReturnValue({
      tasks: sampleTasks,
      addTask: jest.fn(),
      updateTask: jest.fn(),
      deleteTask: jest.fn(),
    });

    render(<TaskList />);

    // Check that TaskItem components receive correct props
    sampleTasks.forEach((task) => {
      expect(screen.getByText(task.title)).toBeInTheDocument();
    });
  });
});
