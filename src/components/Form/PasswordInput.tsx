import React from 'react';

interface PasswordInputProps {
    value: string;
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

function PasswordInput({ value, onChange, placeholder = "Password" }: PasswordInputProps) {
    return (
        <input
            type="password"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    );
}

export default React.memo(PasswordInput);