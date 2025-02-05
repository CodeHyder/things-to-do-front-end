import { renderHook, act, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import useTasks from "../../hooks/useTasks";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

describe("useTasks Hook", () => {
  let mockAxios;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    localStorage.setItem("token", "fake-token");
  });

  afterEach(() => {
    mockAxios.reset();
    localStorage.clear();
  });

  it("deve buscar as tarefas com sucesso", async () => {
    const mockTasks = [{ id: 1, title: "Tarefa Teste" }];
    mockAxios.onGet(`${API_URL}/api/tasks`).reply(200, mockTasks);

    const { result } = renderHook(() => useTasks());

    await act(async () => {
      await Promise.resolve(); 
    });

    expect(result.current.tasks).toEqual(mockTasks);
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it("deve lidar com erro ao buscar tarefas", async () => {
    mockAxios.onGet(`${API_URL}/api/tasks`).reply(500);

    const { result } = renderHook(() => useTasks());

    await act(async () => {
      await Promise.resolve(); 
    });

    expect(result.current.tasks).toEqual([]);
    expect(result.current.error).toBe("Erro ao buscar tarefas.");
    expect(result.current.loading).toBe(false);
  });

  it("deve exibir erro caso o token não esteja disponível", async () => {
    localStorage.removeItem("token");

    const { result } = renderHook(() => useTasks());

    await act(async () => {
      await Promise.resolve(); 
    });
    expect(result.current.error).toBe("Erro ao buscar tarefas.");
    expect(result.current.loading).toBe(false);
  });

  it("deve adicionar uma nova tarefa com sucesso", async () => {
    const newTask = { id: 3, title: "Nova Tarefa" };
    mockAxios.onPost(`${API_URL}/api/tasks`).reply(201, newTask);

    const { result } = renderHook(() => useTasks());

    await act(async () => {
      await result.current.addTask({ title: "Nova Tarefa" });
    });

    expect(result.current.tasks).toContainEqual(newTask);
    expect(result.current.taskLoading).toBe(false);
  });

  it("deve lidar com erro ao adicionar tarefa", async () => {
    mockAxios.onPost(`${API_URL}/api/tasks`).reply(500);

    const consoleErrorMock = jest.spyOn(console, "error").mockImplementation(() => { });

    const { result } = renderHook(() => useTasks());

    await act(async () => {
      await result.current.addTask({ title: "Nova Tarefa" });
    });

    expect(consoleErrorMock).toHaveBeenCalledWith(
      "Erro ao adicionar tarefa:",
      expect.any(Error)
    );

    expect(result.current.tasks).toEqual([]); 
    expect(result.current.taskLoading).toBe(false);

    consoleErrorMock.mockRestore();
  });

  it("deve ativar e desativar taskLoading corretamente", async () => {
    const newTask = { id: 4, title: "Outra Tarefa" };
    mockAxios.onPost(`${API_URL}/api/tasks`).reply(201, newTask);

    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.addTask({ title: "Outra Tarefa" });
    });

    await waitFor(() => expect(result.current.taskLoading).toBe(true));
    await waitFor(() => expect(result.current.taskLoading).toBe(false));


  });

  it("deve deletar uma tarefa corretamente", async () => {
    const initialTasks = [
      { _id: "1", title: "Tarefa 1" },
      { _id: "2", title: "Tarefa 2" },
    ];

    mockAxios.onDelete(`${API_URL}/api/tasks/1`).reply(200);

    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.setTasks(initialTasks);
    });

    act(() => {
      result.current.deleteTask("1");
    });

    await waitFor(() => expect(result.current.taskLoading).toBe(true)); 
    await waitFor(() => expect(result.current.taskLoading).toBe(false));

    expect(result.current.tasks).toEqual([{ _id: "2", title: "Tarefa 2" }]);
  });

  it("deve alternar o status de uma tarefa corretamente", async () => {
    const initialTasks = [
      { _id: "1", title: "Tarefa 1", completed: false },
      { _id: "2", title: "Tarefa 2", completed: true },
    ];

    const updatedTask = { ...initialTasks[0], completed: true };

    mockAxios
      .onPut(`${API_URL}/api/tasks/1`)
      .reply(200, updatedTask); 

    const { result } = renderHook(() => useTasks());

    
    act(() => {
      result.current.setTasks(initialTasks);
    });

    act(() => {
      result.current.toggleTaskStatus("1");
    });

    await waitFor(() => {
      expect(result.current.tasks).toEqual([
        { _id: "1", title: "Tarefa 1", completed: true },
        { _id: "2", title: "Tarefa 2", completed: true },
      ]);
    });
  });

  it("deve reverter o status da tarefa em caso de erro na API", async () => {
    const initialTasks = [{ _id: "1", title: "Tarefa 1", completed: false }];

    mockAxios.onPut(`${API_URL}/api/tasks/1`).reply(500); 
    const consoleErrorMock = jest.spyOn(console, "error").mockImplementation(() => { });

    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.setTasks(initialTasks);
    });

    act(() => {
      result.current.toggleTaskStatus("1");
    });

    await waitFor(() => {
      expect(result.current.tasks).toEqual([{ _id: "1", title: "Tarefa 1", completed: false }]);
    });
    consoleErrorMock.mockRestore();
  });

  it("deve atualizar a tarefa corretamente", async () => {
    const initialTasks = [{ _id: "1", title: "Antigo Título", description: "Antiga Descrição" }];
    const updatedTask = { _id: "1", title: "Novo Título", description: "Nova Descrição" };

    mockAxios.onPut(`${API_URL}/api/tasks/1`).reply(200, updatedTask);

    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.setTasks(initialTasks);
    });

    await act(async () => {
      await result.current.updateTask("1", "Nova Descrição", "Novo Título");
    });

    expect(result.current.tasks).toEqual([updatedTask]);
  });

  it("deve lidar corretamente com erro ao atualizar a tarefa e restaurar o estado anterior", async () => {
    const initialTasks = [{ _id: "1", title: "Antigo Título", description: "Antiga Descrição" }];

    mockAxios.onPut(`${API_URL}/api/tasks/1`).reply(500);
    const consoleErrorMock = jest.spyOn(console, "error").mockImplementation(() => {});
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.setTasks(initialTasks);
    });

    await act(async () => {
      await result.current.updateTask("1", "Nova Descrição", "Novo Título");
    });

    expect(result.current.tasks).toEqual(initialTasks);
    consoleErrorMock.mockRestore();
  });

  it("deve ativar e desativar taskLoading corretamente", async () => {
    const initialTasks = [{ _id: "1", title: "Tarefa", description: "Descrição" }];
 
    mockAxios.onPut(`${API_URL}/api/tasks/1`).reply(() =>
      new Promise((resolve) => {
        setTimeout(() => resolve([200, {}]), 500);

      })
    );

    const { result } = renderHook(() => useTasks());
 
    act(() => {
      result.current.setTasks(initialTasks);
    });

    let updateTaskPromise;
    
    await act(async () => {
      updateTaskPromise = result.current.updateTask("1", "Nova Descrição", "Novo Título");
    });

    
    await waitFor(() => {
      expect(result.current.taskLoading).toBe(true);
    }, { timeout: 600 }); 

   
    await act(async () => {
      await updateTaskPromise;
    });

    
    await waitFor(() => {
      expect(result.current.taskLoading).toBe(false);
    });

  });

  it("deve atualizar a ordem das tarefas com sucesso", async () => {
    const orderedTasks = [
      { _id: "1", order: 1 },
      { _id: "2", order: 2 },
    ];

    mockAxios.onPut(`${API_URL}/api/tasks/reorder`).reply(200);

    const { result } = renderHook(() => useTasks());

    await act(async () => {
      await result.current.updateTaskOrder(orderedTasks);
    });

  });

  it("deve logar erro caso a atualização da ordem das tarefas falhe", async () => {
    const orderedTasks = [
      { _id: "1", order: 1 },
      { _id: "2", order: 2 },
    ];

    mockAxios.onPut(`${API_URL}/api/tasks/reorder`).reply(500);

    const consoleErrorMock = jest.spyOn(console, "error").mockImplementation(() => {});

    const { result } = renderHook(() => useTasks());

    await act(async () => {
      await result.current.updateTaskOrder(orderedTasks);
    });

    expect(consoleErrorMock).toHaveBeenCalledWith(
      "Erro ao atualizar a ordem das tarefas:",
      expect.any(Error)
    );

    consoleErrorMock.mockRestore();
  });

});

