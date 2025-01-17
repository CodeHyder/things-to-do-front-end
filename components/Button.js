const Button = ({ children, onClick, className, type = 'button', ...props }) => {
    return (
        <button
            className={className}
            onClick={onClick}
            type={type}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button;