import { useState } from "react";
import Button from "./Button";
import Input from "./Input";

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
          <Input 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required={true}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Descrição:</label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}  
          />
        </div>
        <Button
          className={"w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition my-7"}
          type="submit">
          Criar Tarefa
        </Button>
      </form>
    </div>
  );
};

export default CreateTask;
