import { useState, useEffect } from "react";
import Button from "./Button";
import Input from "./Input";

const TaskForm = ({
  initialTitle = "",
  initialDescription = "",
  onSubmit,
  submitButtonText = "Salvar",
  loading,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  useEffect(() => {
    setTitle(initialTitle);
    setDescription(initialDescription);
  }, [initialTitle, initialDescription]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="title"
          className="block text-gray-700 font-medium mb-2">
          Título:
        </label>
        <Input
          id={"title"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor='description' className="block text-gray-700 font-medium mb-2">Descrição:</label>
        <Input
          id={"description"}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <Button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
        disabled={loading}
      >
        {submitButtonText}
      </Button>
    </form>
  );
};

export default TaskForm;
