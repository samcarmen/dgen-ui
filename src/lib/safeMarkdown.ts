import { marked } from "marked";
import DOMPurify from "dompurify";
import { browser } from "$app/environment";

marked.setOptions({
    breaks: false,
    gfm: true,     // GitHub-style markdown
});

// Convert markdown to sanitized HTML.
export function renderSafeMarkdown(markdown: string): string {
    if (!browser) return markdown;
    const rawHtml = marked.parse(markdown) as string;
    const cleanHtml = DOMPurify.sanitize(rawHtml, {
        USE_PROFILES: { html: true },
    });
    return cleanHtml;
}
