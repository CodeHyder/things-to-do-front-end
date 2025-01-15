const Button = ({ children, onClick, color }) => {
    const COLORS = {
        red: 'bg-red-500 text-white p-1 m-2 hover:bg-red-600',
        yellow: 'bg-yellow-500 text-white p-1 m-2 hover:bg-yellow-600',
    }
    const classes = COLORS[color]
    return (
        <button
            className={classes}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button;