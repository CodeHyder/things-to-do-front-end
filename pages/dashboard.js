import useTasks from '../hooks/UseTasks';
import TaskList from '../components/TaskList';
import CreateTask from '../components/CreateTask';
import withAuth from '../utils/withAuth';
import Button from '../components/Button';
import { useRouter } from 'next/router'; 
import { useEffect } from 'react';

const Dashboard = () => {
    const { tasks, loading, error, addTask, deleteTask, toggleTaskStatus, updateTask, setTasks, updateTaskOrder, fetchTasks } = useTasks();
    const router = useRouter();

    const logout = () => {
        localStorage.removeItem('token');
        if (router) {
            router.replace('/login');
        }
    }

    useEffect(() => {
        fetchTasks();
      }, []);

    return (
        
        <div className="min-h-screen bg-gray-100 p-6">
             <Button
                onClick={() => logout()}
                color="black">
                Sair
            </Button>
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Things to Do</h1>
                <CreateTask addTask={addTask} />
                <TaskList
                    onUpdateTask={updateTask}
                    tasks={tasks}
                    setTasks={setTasks}
                    loading={loading}
                    error={error}
                    onDelete={deleteTask}
                    onToggleStatus={toggleTaskStatus} 
                    updateTaskOrder={updateTaskOrder}
                />
            </div>
           
        </div>
    );
};

export default withAuth(Dashboard);
