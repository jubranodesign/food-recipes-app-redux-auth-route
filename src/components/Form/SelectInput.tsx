import React from 'react';

interface SelectInputProps {
    value: string;
    onChange: (e: React.FormEvent<HTMLSelectElement>) => void;
    options: { value: string; label: string }[];
    placeholder?: string;
    className?: string;
}

export default function SelectInput({ value, onChange, options, placeholder = "Choose...", className = "" }: SelectInputProps) {
    return (
        <select value={value} onChange={onChange} className={className}>
            <option value="">{placeholder}</option>
            {options.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
        </select>
    );
}