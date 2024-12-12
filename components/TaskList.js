// components/TaskList.js
import TaskItem from './TaskItem';

const TaskList = ({ tasks, loading, error, onDelete }) => {
  if (loading) return <p>Carregando tarefas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <ul>
        {tasks.map((task) => (
          <TaskItem key={`task-${task._id}`} task={task} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
