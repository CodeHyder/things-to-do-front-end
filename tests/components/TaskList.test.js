import { render, screen, fireEvent } from "@testing-library/react";
import TaskList from "../../components/TaskList"; 

jest.mock("../../components/TaskItem", () => ({ task, onDelete, onToggleStatus, onUpdateTask, ontaskLoading }) => (
  <li>
    <span>{task.text}</span>
    <button onClick={() => onDelete(task._id)}>Delete</button>
    <button onClick={() => onToggleStatus(task._id)}>Toggle</button>
  </li>
));

describe("TaskList Component", () => {
  const tasks = [
    { _id: "1", text: "Task 1", completed: false },
    { _id: "2", text: "Task 2", completed: true },
  ];

  const setTasks = jest.fn();
  const onDelete = jest.fn();
  const onToggleStatus = jest.fn();
  const onUpdateTask = jest.fn();
  const onUpdateTaskOrder = jest.fn();
  const taskLoading = jest.fn();

  it("renders loading state", () => {
    render(<TaskList tasks={[]} loading={true} error={null} setTasks={setTasks} onDelete={onDelete} onToggleStatus={onToggleStatus} onUpdateTask={onUpdateTask} onUpdateTaskOrder={onUpdateTaskOrder} taskLoading={taskLoading} />);
    expect(screen.getByText("Carregando tarefas...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    render(<TaskList tasks={[]} loading={false} error="Erro!" setTasks={setTasks} onDelete={onDelete} onToggleStatus={onToggleStatus} onUpdateTask={onUpdateTask} onUpdateTaskOrder={onUpdateTaskOrder} taskLoading={taskLoading} />);
    expect(screen.getByText("Erro ao carregar tarefas: Erro!")).toBeInTheDocument();
  });

  it("renders empty state", () => {
    render(<TaskList tasks={[]} loading={false} error={null} setTasks={setTasks} onDelete={onDelete} onToggleStatus={onToggleStatus} onUpdateTask={onUpdateTask} onUpdateTaskOrder={onUpdateTaskOrder} taskLoading={taskLoading} />);
    expect(screen.getByText("Não há coisas para fazer :)")).toBeInTheDocument();
  });

  it("renders task items", () => {
    render(<TaskList tasks={tasks} loading={false} error={null} setTasks={setTasks} onDelete={onDelete} onToggleStatus={onToggleStatus} onUpdateTask={onUpdateTask} onUpdateTaskOrder={onUpdateTaskOrder} taskLoading={taskLoading} />);
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });

  it("calls onDelete when delete button is clicked", () => {
    render(<TaskList tasks={tasks} loading={false} error={null} setTasks={setTasks} onDelete={onDelete} onToggleStatus={onToggleStatus} onUpdateTask={onUpdateTask} onUpdateTaskOrder={onUpdateTaskOrder} taskLoading={taskLoading} />);
    fireEvent.click(screen.getAllByText("Delete")[0]);
    expect(onDelete).toHaveBeenCalledWith("1");
  });

  it("calls onToggleStatus when toggle button is clicked", () => {
    render(<TaskList tasks={tasks} loading={false} error={null} setTasks={setTasks} onDelete={onDelete} onToggleStatus={onToggleStatus} onUpdateTask={onUpdateTask} onUpdateTaskOrder={onUpdateTaskOrder} taskLoading={taskLoading} />);
    fireEvent.click(screen.getAllByText("Toggle")[0]);
    expect(onToggleStatus).toHaveBeenCalledWith("1");
  });
   
});
