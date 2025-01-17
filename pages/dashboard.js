import TaskList from '../components/TaskList';
import CreateTask from '../components/CreateTask';
import withAuth from '../utils/withAuth';
import Button from '../components/Button';
import useUser from '../hooks/useUser';
import useTasks from '../hooks/useTasks';

const Dashboard = () => {
    const { tasks, loading, error, addTask, deleteTask, toggleTaskStatus, updateTask, setTasks, updateTaskOrder } = useTasks();
    const { username, logout, loading: userLoading, error: userError } = useUser();


    if (userLoading) {
        return <div className="flex items-center justify-center h-screen text-gray-600 text-lg font-semibold">Carregando tarefas.....</div>;
    }

    if (userError) {
        return <div className="flex items-center justify-center h-screen bg-red-100 text-red-600 text-lg font-semibold p-4 rounded-lg">{userError}</div>;
    }

    return (

        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className='text-3xl font-bold text-gray-800 mb-6 text-center'>Bem vindo {username}</h1>
            <Button
                onClick={() => logout()}
                className="bg-black text-white hover:bg-black hover:bg-opacity-80 cursor-pointer rounded-none px-4 py-2 w-24 h-10 font-bold text-sm mb-6"
                type='button'
            >
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
