import { useState } from 'react';
import './TokenDisplay.css'

interface TokenDisplayProps {
    token: string | null | undefined;
}

export default function TokenDisplay({ token }: TokenDisplayProps) {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        if (token) {
            navigator.clipboard.writeText(token);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 1500); // Resets copy state after 1.5s
        }
    };

    return (
        <div className="token-display">
            <h4>🔐 Your Authentication Token</h4>
            <div className="token-box">
                <code>{token || 'No token available'}</code>
                <button onClick={handleCopy}>
                    {isCopied ? '✅ Copied!' : '📋 Copy Token'}
                </button>
            </div>
        </div>
    );
};

