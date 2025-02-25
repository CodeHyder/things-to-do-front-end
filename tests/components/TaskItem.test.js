import { render, screen, fireEvent } from "@testing-library/react";
import TaskItem from "../../components/TaskItem"; 

const mockTask = {
  _id: "1",
  title: "Test Task",
  description: "Test Description",
  completed: false,
};

const mockOnDelete = jest.fn();
const mockOnToggleStatus = jest.fn();
const mockOnUpdateTask = jest.fn();
const mockTaskLoading = false;

describe("TaskItem Component", () => {
  test("renders task title and description", () => {
    render(
      <TaskItem
        task={mockTask}
        onDelete={mockOnDelete}
        onToggleStatus={mockOnToggleStatus}
        onUpdateTask={mockOnUpdateTask}
        ontaskLoading={mockTaskLoading}
      />
    );

    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  test("calls onDelete when delete button is clicked", () => {
    render(
      <TaskItem
        task={mockTask}
        onDelete={mockOnDelete}
        onToggleStatus={mockOnToggleStatus}
        onUpdateTask={mockOnUpdateTask}
        ontaskLoading={mockTaskLoading}
      />
    );

    const deleteButton = screen.getByText("Deletar");
    fireEvent.click(deleteButton);
    expect(mockOnDelete).toHaveBeenCalledWith("1");
  });

  test("enters edit mode when edit button is clicked", () => {
    render(
      <TaskItem
        task={mockTask}
        onDelete={mockOnDelete}
        onToggleStatus={mockOnToggleStatus}
        onUpdateTask={mockOnUpdateTask}
        ontaskLoading={mockTaskLoading}
      />
    );

    const editButton = screen.getByText("Editar");
    fireEvent.click(editButton);

    expect(screen.getByDisplayValue("Test Task")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test Description")).toBeInTheDocument();
  });

  test("calls onToggleStatus when checkbox is clicked", () => {
    render(
      <TaskItem
        task={mockTask}
        onDelete={mockOnDelete}
        onToggleStatus={mockOnToggleStatus}
        onUpdateTask={mockOnUpdateTask}
        ontaskLoading={mockTaskLoading}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(mockOnToggleStatus).toHaveBeenCalledWith(mockTask._id);
  });
});
