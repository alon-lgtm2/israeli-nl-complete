export function renderMarkdown(text: string): string {
  return text
    // Headers
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Line breaks into paragraphs
    .split('\n\n')
    .filter(Boolean)
    .map((block) => {
      if (block.startsWith('<h2>') || block.startsWith('<h3>')) return block;
      return `<p>${block}</p>`;
    })
    .join('\n');
}
