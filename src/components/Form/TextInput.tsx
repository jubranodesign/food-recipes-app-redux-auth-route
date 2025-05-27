import React from 'react';

interface TextInputProps {
    value?: string;
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

export default function TextInput({ value, onChange, placeholder = "Enter text" }: TextInputProps) {
    return (
        <input
            type="text"
            onChange={onChange}
            placeholder={placeholder}
            value={value}
        />
    );
}