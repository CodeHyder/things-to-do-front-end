// components/CreateTask.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const CreateTask = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
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

    const taskData = { title, description, completed };

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
  };

  return (
    <div class="border border-red-500">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            class="text-black"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descrição:</label>
          <input
            class="text-black"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Concluída:</label>
          <input
            type="checkbox"
            checked={completed}
            onChange={() => setCompleted(!completed)}
          />
        </div>
        <button class="bg-white text-black" type="submit">Criar Tarefa</button>
      </form>
    </div>
  );
};

export default CreateTask;