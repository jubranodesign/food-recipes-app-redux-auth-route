import React from 'react';

interface ButtonProps {
    onClick: () => void;
    value: string;
    disabled?: boolean;
    className?: string;
    type?: "button" | "submit" | "reset";
}

function Button({ onClick, value, disabled = false, className = '', type = "button" }: ButtonProps) {
    return (
        <input
            type={type}
            onClick={onClick}
            value={value}
            disabled={disabled}
            className={className}
        />
    );
}

export default React.memo(Button);