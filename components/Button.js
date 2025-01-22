const Button = ({ children, onClick, className, type = 'button', disabled, ...props }) => {
    return (
        <button
            className={`${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={onClick}
            type={type}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button;