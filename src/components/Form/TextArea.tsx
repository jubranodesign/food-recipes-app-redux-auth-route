import React from 'react';

interface TextAreaProps {
    value: string;
    onChange: (e: React.FormEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    rows?: number;
    className?: string;
}

function TextArea({ value, onChange, placeholder = "Enter text", rows = 4, className = "" }: TextAreaProps) {
    return (
        <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            className={className}
        />
    );
}

export default React.memo(TextArea);