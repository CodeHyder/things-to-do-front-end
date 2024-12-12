import useTasks from '../hooks/UseTasks';
import TaskList from '../components/TaskList';
import CreateTask from '../components/CreateTask';
import '../src/app/globals.css';

const Home = () => {
  const { tasks, loading, error, addTask, deleteTask, updateTaskStatus } = useTasks();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Things to Do</h1>
        <CreateTask addTask={addTask} />
        <TaskList
          tasks={tasks}
          loading={loading}
          error={error}
          onDelete={deleteTask}
          onStatusChange={updateTaskStatus}
        />
      </div>
    </div>
  );
};

export default Home;
