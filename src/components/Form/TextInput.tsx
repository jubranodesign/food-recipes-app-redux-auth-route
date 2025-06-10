import React from 'react';

interface TextInputProps {
    value: string | undefined;
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
}

function TextInput({ value, onChange, placeholder = "Enter text", className = "" }: TextInputProps) {
    return (
        <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={className}
        />
    );
}

export default React.memo(TextInput);