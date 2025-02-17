import { render, screen, fireEvent } from "@testing-library/react";
import TaskForm from "../../components/TaskForm";

describe("TaskForm Component", () => {
  test("renders form elements correctly", () => {
    render(<TaskForm onSubmit={jest.fn()} />);
    
    expect(screen.getByLabelText(/Título:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Descrição:/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Salvar/i })).toBeInTheDocument();
  });

  test("updates input values on change", () => {
    render(<TaskForm onSubmit={jest.fn()} />);

    const titleInput = screen.getByLabelText(/Título:/i);
    const descriptionInput = screen.getByLabelText(/Descrição:/i);
    
    fireEvent.change(titleInput, { target: { value: "Nova Tarefa" } });
    fireEvent.change(descriptionInput, { target: { value: "Descrição da tarefa" } });
    
    expect(titleInput.value).toBe("Nova Tarefa");
    expect(descriptionInput.value).toBe("Descrição da tarefa");
  });

  test("calls onSubmit with correct data and clears inputs", () => {
    const mockOnSubmit = jest.fn();
    render(<TaskForm onSubmit={mockOnSubmit} />);

    const titleInput = screen.getByLabelText(/Título:/i);
    const descriptionInput = screen.getByLabelText(/Descrição:/i);
    const submitButton = screen.getByRole("button", { name: /Salvar/i });

    fireEvent.change(titleInput, { target: { value: "Tarefa Teste" } });
    fireEvent.change(descriptionInput, { target: { value: "Descrição Teste" } });
    fireEvent.click(submitButton);
    
    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: "Tarefa Teste",
      description: "Descrição Teste"
    });
    expect(titleInput.value).toBe("");
    expect(descriptionInput.value).toBe("");
  });

  test("disables submit button when loading is true", () => {
    render(<TaskForm onSubmit={jest.fn()} loading={true} />);
    const submitButton = screen.getByRole("button", { name: /Salvar/i });
    expect(submitButton).toBeDisabled();
  });
});
