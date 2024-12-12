// components/TaskItem.js
import Link from 'next/link';

const TaskItem = ({ task, onDelete }) => (
  <li>
    <h3>{`titulo: ${task.title}`}</h3>
    <p>{`descrição: ${task.description}`}</p>
    <p>{task.completed ? 'Concluída' : 'Pendente'}</p>
    <button class="bg-white text-black" onClick={() => onDelete(task._id)}>Deletar</button>
  </li>
);

export default TaskItem;