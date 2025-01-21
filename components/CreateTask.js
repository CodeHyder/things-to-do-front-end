import { useState } from "react";
import TaskForm from "./TaskForm";

const CreateTask = ({ addTask }) => {
  const [loading, setLoading] = useState(false);

  const handleCreate = async ({ title, description }) => {
    setLoading(true);
    try {
      await addTask({ title, description });
    } finally{
      setLoading(false);
    }
  };

  return (
    <div className="mb-5">
      <TaskForm
        onSubmit={handleCreate}
        submitButtonText="Criar Tarefa"
        loading={loading}
      />
    </div>
  );
};

export default CreateTask;
