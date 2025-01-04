import useTasks from '../hooks/UseTasks';
import TaskList from '../components/TaskList';
import CreateTask from '../components/CreateTask';
import withAuth from '../utils/withAuth';
import { useRouter } from 'next/router'; 

const Dashboard = () => {
    const { tasks, loading, error, addTask, deleteTask, toggleTaskStatus, updateTask  } = useTasks();
    const router = useRouter();

    const logout = () => {
        localStorage.removeItem('token');
        if (router) {
            router.replace('/login');
        }
    }

    return (
        
        <div className="min-h-screen bg-gray-100 p-6">
             <button
                onClick={() => logout()}
                className="bg-black text-white hover:bg-black hover:bg-opacity-80 cursor-pointer rounded-none px-4 py-2 w-24 h-10 font-bold text-sm">
                Sair
            </button>
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Things to Do</h1>
                <CreateTask addTask={addTask} />
                <TaskList
                    tasks={tasks}
                    loading={loading}
                    error={error}
                    onDelete={deleteTask}
                    onToggleStatus={toggleTaskStatus}
                    onUpdateDescription={updateTask}
                />
            </div>
           
        </div>
    );
};

export default withAuth(Dashboard);
