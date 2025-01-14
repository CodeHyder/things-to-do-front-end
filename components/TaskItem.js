import { useState } from 'react';


const TaskItem = ({ task, onDelete, onToggleStatus, onUpdateTask }) => {

  const [isEditing, setIsEditing] = useState(false);
  const [newDescription, setNewDescription] = useState(task.description);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleSave = () => {
    onUpdateTask(task._id, newDescription, newTitle);
    setIsEditing(false);
  }; 
  return (
    <li className="flex justify-between items-center bg-gray-50 p-4 rounded-md shadow-sm mb-3">
      <div>

        {isEditing ? (
          <>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-1 border rounded-md text-gray-800 focus:outline-none focus:ring focus:ring-blue-200"
            />
            <input
              type="text"
              value={newDescription === '' ? setNewDescription(' ') : newDescription }
              onChange={(e) => setNewDescription(e.target.value)}
              className="w-full p-1 border rounded-md text-gray-800 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </>
        ) : (
          <>
            <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
            <p className="text-gray-600">{task.description}</p>
          </>
        )}
      </div>

      <div className="flex items-center space-x-4">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
          >
            Salvar
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
          >
            Editar
          </button>
        )}
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleStatus(task._id)}
            className="h-5 w-5 text-blue-500 rounded focus:ring focus:ring-blue-200"
          />
          <span className={`text-sm ${task.completed ? 'text-green-600' : 'text-gray-600'}`}>
            {task.completed ? 'Concluída' : 'Pendente'}
          </span>
        </label>
        <button
          className="bg-red-500 text-white p-1 m-2"
          onClick={() => onDelete(task._id)}
        >
          Deletar
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
