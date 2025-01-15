const EditTaskForm = ({ onSubmit, newTitle, setNewTitle, newDescription, setNewDescription }) => {
    return (
        <form onSubmit={onSubmit} className="space-y-2">
            <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full p-1 border rounded-md text-gray-800 focus:outline-none focus:ring focus:ring-blue-200"
                required
            />
            <input
                type="text"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="w-full p-1 border rounded-md text-gray-800 focus:outline-none focus:ring focus:ring-blue-200"
            />
            <div className="mt-2">
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                    Salvar
                </button>
            </div>
        </form>
    )
}

export default EditTaskForm;