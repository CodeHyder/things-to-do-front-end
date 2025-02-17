const Input = ({ id, onChange, type='text', required=false, value, className='w-full p-2 border rounded-md text-gray-800 focus:outline-none focus:ring focus:ring-blue-200' }) => {
    return (
        <input 
        id={id}
        required={required}
        onChange={onChange}
        type={type}
        value={value}
        className={className}
        />
    )
}

export default Input;