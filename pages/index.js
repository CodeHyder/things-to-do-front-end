// pages/index.js
import useTasks from '../hooks/UseTasks';
import TaskList from '../components/TaskList';
import CreateTask from '../components/CreateTask';  
import '../src/app/globals.css';

const Home = () => {
  const { tasks, loading, error, addTask, deleteTask } = useTasks();

  return (
    <div class="border border-red-500">
      <h1>Things to Do</h1>
      <CreateTask addTask={addTask} />
      <TaskList tasks={tasks} loading={loading} error={error} onDelete={deleteTask} />
    </div>
  );
};

export default Home;