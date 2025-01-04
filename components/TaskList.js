import TaskItem from "./TaskItem";

const TaskList = ({ tasks, loading, error, onDelete, onToggleStatus, onUpdateDescription  }) => {
  if (loading) {
    return <p className="text-gray-500">Carregando tarefas...</p>;
  }

  if (error) {
    return <p className="text-red-500">Erro ao carregar tarefas: {error}</p>;
  }

  if (!tasks.length) {
    return <p className="text-gray-500">Não há coisas para fazer :)</p>;
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={`task-${task._id}`}
          task={task}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
          onUpdateDescription={onUpdateDescription}
        />
      ))}
    </ul>
  );
};

export default TaskList;
