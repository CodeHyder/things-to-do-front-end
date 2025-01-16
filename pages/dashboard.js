import useTasks from '../hooks/UseTasks';
import TaskList from '../components/TaskList';
import CreateTask from '../components/CreateTask';
import withAuth from '../utils/withAuth';
import Button from '../components/Button'; 
import useUser from '../hooks/useUser';

const Dashboard = () => {
    const { tasks, loading, error, addTask, deleteTask, toggleTaskStatus, updateTask, setTasks, updateTaskOrder } = useTasks();
    const { username, logout, loading: userLoading, error: userError } = useUser();


    if (userLoading) {
        return <div>Loading...</div>;
    }

    if (userError) {
        return <div>{userError}</div>;
    }

    return (

        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className='text-3xl font-bold text-gray-800 mb-6 text-center'>Bem vindo {username}</h1>
            <Button
                onClick={() => logout()}
                color="black">
                Sair
            </Button>
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Things to Do</h2>
                <CreateTask addTask={addTask} />
                <TaskList
                    tasks={tasks}
                    setTasks={setTasks}
                    loading={loading}
                    error={error}
                    onUpdateTask={updateTask}
                    onDelete={deleteTask}
                    onToggleStatus={toggleTaskStatus}
                    onUpdateTaskOrder={updateTaskOrder}
                />
            </div>

        </div>
    );
};

export default withAuth(Dashboard);
