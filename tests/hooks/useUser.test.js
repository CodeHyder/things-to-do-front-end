import { renderHook } from "@testing-library/react";
import axios from "axios";
import { useRouter } from "next/router";
import useUser from "../../hooks/useUser";  
import { waitFor } from "@testing-library/react";

jest.mock("axios");
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("useUser hook", () => {
  let mockReplace;

  beforeEach(() => {
    mockReplace = jest.fn();
    useRouter.mockReturnValue({ replace: mockReplace });
    localStorage.clear();
    jest.resetAllMocks();
  });

  it("deve buscar o usuário corretamente e atualizar o estado", async () => {
    localStorage.setItem("userId", "123");
    localStorage.setItem("token", "valid-token");

    axios.get.mockResolvedValue({ data: { username: "Raphael" } });

    const { result } = renderHook(() => useUser());
    
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.username).toBe("Raphael");
    expect(result.current.error).toBeNull();
  });

  it("deve definir erro se o usuário não estiver no localStorage", async () => {
    const { result } = renderHook(() => useUser());
    
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Usuário não encontrado.");
  });

  it("deve definir erro se não houver token", async () => {
    localStorage.setItem("userId", "123");
    
    const { result } = renderHook(() => useUser());
    
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe("Erro ao buscar usuário.");
  });

  it("deve chamar router.replace ao fazer logout", () => {
    localStorage.setItem("token", "valid-token");
    localStorage.setItem("userId", "123");
  
    const mockReplace = jest.fn();
    useRouter.mockReturnValue({ replace: mockReplace });
  
    const { result } = renderHook(() => useUser());
  
    waitFor(() => {
      result.current.logout();
    });
  
    expect(localStorage.getItem("token")).toBeNull();
    expect(localStorage.getItem("userId")).toBeNull();
    expect(mockReplace).toHaveBeenCalledWith("/login");
  });
});
