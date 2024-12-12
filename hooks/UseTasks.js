import { useState, useEffect } from 'react';
import axios from 'axios';

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`);
      setTasks(response.data);
    } catch (err) {
      setError('Erro ao buscar tarefas.');
    } finally {
      setLoading(false);
    }
  };

  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error('Erro ao deletar a tarefa:', error);
    }
  };

  const updateTaskStatus = async (id, newStatus) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${id}`, { completed: newStatus });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, completed: newStatus } : task
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar status da tarefa:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, loading, error, addTask, deleteTask, updateTaskStatus };
};

export default useTasks;
