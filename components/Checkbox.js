const Checkbox = ({task, onToggleStatus} ) => {
    return (
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleStatus(task._id)}
            className="h-5 w-5 text-blue-500 rounded focus:ring focus:ring-blue-200"
          />
          <span className={`text-sm ${task.completed ? 'text-green-600 line-through' : 'text-gray-600'}`}>
            {task.completed ? 'Concluída' : 'Pendente'}
          </span>
        </label>
    )
}

export default Checkbox;