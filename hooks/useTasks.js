import { useState, useEffect } from 'react';
import axios from 'axios';

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [taskLoading, setTaskLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token não encontrado. Faça login novamente.');

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks(response.data);
    } catch (err) {
      setError('Erro ao buscar tarefas.');
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    setTaskLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, taskData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks((prevTasks) => [...prevTasks, response.data]);
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
    } finally {
      setTaskLoading(false);
    }
  };

  const deleteTask = async (id) => {
    setTaskLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error('Erro ao deletar a tarefa:', error);
    } finally {
      setTaskLoading(false);
    }
  };

  const toggleTaskStatus = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const taskToUpdate = tasks.find((task) => task._id === id);
      const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? updatedTask : task))
      );
      
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${id}`, updatedTask, {
        headers: { Authorization: `Bearer ${token}` },
      });


    } catch (error) {
      console.error('Erro ao atualizar status da tarefa:', error);

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id
            ? { ...task, completed: !task.completed }  
            : task
        )
      );
    }
  };

  const updateTask = async (id, newDescription, newTitle) => {
    setTaskLoading(true);
    try {
      const token = localStorage.getItem('token');
      const taskToUpdate = tasks.find((task) => task._id === id);
      const updatedTask = { ...taskToUpdate, description: newDescription, title: newTitle };

      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${id}`, updatedTask, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? updatedTask : task))
      );
    } catch (error) {
      console.error('Erro ao atualizar a descrição da tarefa:', error);
    } finally {
      setTaskLoading(false);
    }
  };

  const updateTaskOrder = async (orderedTasks) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/reorder`, { tasks: orderedTasks }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
    } catch (err) {
      console.error("Erro ao atualizar a ordem das tarefas:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, setTasks, loading, taskLoading, error, addTask, deleteTask, toggleTaskStatus, updateTask, updateTaskOrder, fetchTasks };
};

export default useTasks;
