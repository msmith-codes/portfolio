'use client';

import { useEffect, useState } from 'react';
import { highlightCode } from '~/lib/highlight';

interface CodeBlockProps {
  code: string;
  language: string;
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    highlightCode(code, language).then(setHtml);
  }, [code, language]);

  return (
    <div
      className="shiki rounded-lg overflow-x-auto my-4"
      dangerouslySetInnerHTML={html ? { __html: html } : undefined}
    />
  );
}
