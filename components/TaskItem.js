import axios from 'axios';

const TaskItem = ({ task, onDelete, onStatusChange }) => {
  const handleStatusToggle = async () => {
    const updatedTask = { ...task, completed: !task.completed };
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${task._id}`, { completed: updatedTask.completed });
      onStatusChange(task._id, updatedTask.completed); // Atualiza o estado no componente pai.
    } catch (error) {
      console.error('Erro ao atualizar status da tarefa:', error);
    }
  };

  return (
    <li className="flex justify-between items-center bg-gray-50 p-4 rounded-md shadow-sm mb-3">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
        <p className="text-gray-600">{task.description}</p>
      </div>

      <div className="flex items-center space-x-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleStatusToggle}
            className="h-5 w-5 text-blue-500 rounded focus:ring focus:ring-blue-200"
          />
          <span className={`text-sm ${task.completed ? 'text-green-600' : 'text-gray-600'}`}>
            {task.completed ? 'Concluída' : 'Pendente'}
          </span>
        </label>
        <button
          className="bg-red-500 text-white p-1 m-2"
          onClick={() => onDelete(task._id)}>
          Deletar
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
