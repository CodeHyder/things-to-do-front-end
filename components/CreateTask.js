import { useState } from "react";

const CreateTask = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTask({ title, description });
    setTitle('');
    setDescription('');
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
        <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition my-7" type="submit">
          Criar Tarefa
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
