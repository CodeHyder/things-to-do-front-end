const Button = ({ children, onClick, color }) => {
    const COLORS = {
        red: 'bg-red-500 text-white p-1 m-2 hover:bg-red-600 w-24 mx-0',
        yellow: 'bg-yellow-500 text-white p-1 m-2 hover:bg-yellow-600 w-24 mx-0',
        black: 'bg-black text-white hover:bg-black hover:bg-opacity-80 cursor-pointer rounded-none px-4 py-2 w-24 h-10 font-bold text-sm mb-6'
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