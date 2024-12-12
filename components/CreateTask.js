// components/CreateTask.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const CreateTask = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${id}`);
          const task = response.data;
          setTitle(task.title);
          setDescription(task.description);
          setCompleted(task.completed);
        } catch (error) {
          console.error('Erro ao buscar tarefa:', error);
        }
      };
      fetchTask();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = { title, description };

    try {
      if (id) {
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${id}`, taskData);
      } else {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, taskData);
        addTask(response.data);
      }
      router.push('/');
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error);
    }
    setTitle(""); // Limpa o campo título
    setDescription(""); // Limpa o campo descrição
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Título:</label>
          <input 
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border rounded-md text-gray-800 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Descrição:</label>
          <input 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-2 border rounded-md text-gray-800 focus:outline-none focus:ring focus:ring-blue-200"  
          />
        </div>
        <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition my-7" type="submit">Criar Tarefa</button>
      </form>
    </div>
  );
};

export default CreateTask;