import { useState } from 'react'; 
import Checkbox from './Checkbox';
import Button from './Button';
import TaskForm from './TaskForm';

const TaskItem = ({ task, onDelete, onToggleStatus, onUpdateTask, ontaskLoading }) => {

  const [isEditing, setIsEditing] = useState(false); 

  const handleUpdate = async ({ title, description }) => {
    await onUpdateTask(task._id, description, title);
    setIsEditing(false);
  };

  return (
    <li className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 p-4 rounded-md shadow-sm mb-3 space-y-4 sm:space-y-0 sm:space-x-4">
      <div className="flex-1">
        {isEditing ? ( 
          <TaskForm
            initialTitle={task.title}
            initialDescription={task.description}
            onSubmit={handleUpdate}
            loading={ontaskLoading}
            submitButtonText="Salvar"
          />
        ) : (
          <>
            <h3 className={task.completed ? "text-lg font-semibold text-gray-800 line-through" : "text-lg font-semibold text-gray-800"}>{task.title}</h3>
            <p className="text-gray-600">{task.description}</p>
          </>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
        {!isEditing && (
          <Button
            onClick={() => setIsEditing(true)}
            className={"bg-yellow-500 text-white p-1 m-2 hover:bg-yellow-600 w-24 mx-0"}
          >
            Editar
          </Button>
        )}
        <Button
          onClick={() => onDelete(task._id)}
          className={'bg-red-500 text-white p-1 m-2 hover:bg-red-600 w-24 mx-0  '}
          disabled={ontaskLoading}
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
