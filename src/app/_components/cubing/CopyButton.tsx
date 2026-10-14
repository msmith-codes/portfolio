'use client';

import { useState } from 'react';

interface CopyButtonProps
{
    label : string;
    value : string;
}

export default function CopyButton(props : CopyButtonProps)
{
    const [copied, setCopied] = useState(false);

    const copy = async () =>
    {
        try
        {
            await navigator.clipboard.writeText(props.value);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        }
        catch
        {
            setCopied(false);
        }
    };

    return (
        <button
            type="button"
            onClick={copy}
            className="px-3 py-1 text-sm font-mono border border-foreground/20 rounded text-foreground hover:text-foreground/80 transition-colors"
        >
            {copied ? 'Copied' : props.label}
        </button>
    );
}
