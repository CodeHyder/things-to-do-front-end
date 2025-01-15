import TaskItem from "./TaskItem";
import { useRef, useEffect } from "react";
import Sortable from "sortablejs";

const TaskList = ({ tasks, setTasks, loading, error, onDelete, onToggleStatus, onUpdateTask, updateTaskOrder }) => {
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      
      const sortable = new Sortable(listRef.current, {
        animation: 150,
        onEnd: (evt) => {
          const updatedTasks = [...tasks];
          const [movedTask] = updatedTasks.splice(evt.oldIndex, 1);
          updatedTasks.splice(evt.newIndex, 0, movedTask);

          setTasks(updatedTasks); 
          const tasksForAPI = updatedTasks.map((task, index) => ({
            _id: task._id,
            position: index,
          }));
          
          updateTaskOrder(tasksForAPI); 
        },
      });

      return () => sortable.destroy();
    }
  }, [tasks, setTasks]);

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
    <ul ref={listRef} className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={`task-${task._id}`}
          task={task}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
          onUpdateTask={onUpdateTask}
        />
      ))}
    </ul>
  );
};

export default TaskList;
