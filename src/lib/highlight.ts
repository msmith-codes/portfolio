import { createHighlighter } from 'shiki';

let highlighter: Awaited<ReturnType<typeof createHighlighter>>;

export async function highlightCode(code: string, lang: string): Promise<string> {
    if (!highlighter) {
        highlighter = await createHighlighter({
            themes: ['one-dark-pro'],
            langs: ['c++', 'shell']
        });

    }

    return highlighter.codeToHtml(code, { lang, theme: 'one-dark-pro' });
}
