const Button = ({children, onClick, color}) => {
    return (
        <button
            className={`bg-${color}-500 text-white p-1 m-2 hover:bg-${color}-600`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button;