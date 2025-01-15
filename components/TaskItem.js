import { useState } from 'react';
import EditTaskForm from './EditTaskForm';
import Checkbox from './Checkbox';
import Button from './Button';

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
      <div className="flex-1">
        {isEditing ? (
          <EditTaskForm
            onSubmit={handleSave}
            newTitle={newTitle}
            setNewTitle={setNewTitle}
            newDescription={newDescription}
            setNewDescription={setNewDescription}
          />
        ) : (
          <>
            <h3 className={task.completed ? "text-lg font-semibold text-gray-800 line-through" : "text-lg font-semibold text-gray-800"}>{task.title}</h3>
            <p className="text-gray-600">{task.description}</p>
          </>
        )}
      </div>

      <div className="flex items-center space-x-4">
        {!isEditing && (
          // <button
          //   onClick={() => setIsEditing(true)}
          //   className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
          // >
          //   Editar
          // </button>
          <Button  
          onClick={() => setIsEditing(true)}
          color="yellow"
          >
            Editar
          </Button>
        )}

        {/* <button
          className="bg-red-500 text-white p-1 m-2 hover:bg-red-600"
          onClick={() => onDelete(task._id)}
        >
          Deletar
        </button> */}
        <Button  
        onClick={() => onDelete(task._id)}
        color="red"
        >
          Deletar
        </Button>
        <Checkbox
          task={task}
          onToggleStatus={onToggleStatus}
        />
      </div>
    </li>

  );
};

export default TaskItem;
