 import TaskForm from "./TaskForm";

const CreateTask = ({ addTask, onTaskLoading }) => { 

  const handleCreate = async ({ title, description }) => {
      await addTask({ title, description });
  };

  return (
    <div className="mb-5">
      <TaskForm
        onSubmit={handleCreate}
        submitButtonText="Criar Tarefa"
        loading={onTaskLoading}
      />
    </div>
  );
};

export default CreateTask;
