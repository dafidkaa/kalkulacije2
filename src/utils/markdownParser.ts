/**
 * Simple markdown parser for blog posts
 * Converts markdown to HTML with support for common elements
 */

export interface ParsedMarkdown {
  htmlContent: string;
  toc: Array<{ id: string; title: string; level: number }>;
  frontMatter: Record<string, any>;
}

export function parseMarkdown(markdownContent: string): ParsedMarkdown {
  // Parse front matter
  const frontMatterMatch = markdownContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  let frontMatter: Record<string, any> = {};
  let content = markdownContent;
  
  if (frontMatterMatch) {
    const [, frontMatterYaml, markdownBody] = frontMatterMatch;
    content = markdownBody;
    
    // Parse YAML front matter (basic parsing)
    frontMatterYaml.split('\n').forEach(line => {
      const match = line.match(/^(\w+):\s*"?([^"]*)"?$/);
      if (match) {
        const [, key, value] = match;
        frontMatter[key] = value.replace(/"/g, '');
      }
    });
  }
  
  // Extract TOC from headings
  const headingMatches = content.match(/^(#{1,6})\s+(.+)$/gm) || [];
  const toc = headingMatches
    .filter(heading => heading.startsWith('## ')) // Only h2 for TOC
    .map((heading, index) => {
      const title = heading.replace(/^## /, '');
      const id = `section-${index + 1}`;
      return { id, title, level: 2 };
    });
  
  // Convert markdown to HTML
  let htmlContent = content
    // Headers
    .replace(/^# (.+)$/gm, '<h1 id="$1">$1</h1>')
    .replace(/^## (.+)$/gm, (match, title) => {
      const id = `section-${toc.findIndex(t => t.title === title) + 1}`;
      return `<h2 id="${id}">${title}</h2>`;
    })
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^#### (.+)$/gm, '<h4>$1</h4>')
    
    // Tables
    .replace(/\|(.+)\|\n\|[-\s|]+\|\n((?:\|.+\|\n?)*)/gm, (match, header, rows) => {
      const headerCells = header.split('|').map(cell => cell.trim()).filter(cell => cell);
      const headerRow = `<tr>${headerCells.map(cell => `<th>${cell}</th>`).join('')}</tr>`;
      
      const bodyRows = rows.trim().split('\n').map(row => {
        const cells = row.split('|').map(cell => cell.trim()).filter(cell => cell);
        return `<tr>${cells.map(cell => `<td>${cell}</td>`).join('')}</tr>`;
      }).join('');
      
      return `<table class="table-auto w-full border-collapse border border-gray-300 my-4">
        <thead class="bg-gray-50">${headerRow}</thead>
        <tbody>${bodyRows}</tbody>
      </table>`;
    })
    
    // Bold and italic
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    
    // Links
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-blue-600 hover:text-blue-800 underline">$1</a>')
    
    // Lists
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>')
    
    // Code blocks
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4"><code>$2</code></pre>')
    .replace(/`(.+?)`/g, '<code class="bg-gray-100 px-2 py-1 rounded">$1</code>')
    
    // Blockquotes
    .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-blue-500 pl-4 italic my-4">$1</blockquote>')
    
    // Emojis (keep as-is)
    // Line breaks and paragraphs
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(.+)$/gm, '<p>$1</p>')
    
    // Clean up HTML structure
    .replace(/<p><h/g, '<h')
    .replace(/<\/h([1-6])><\/p>/g, '</h$1>')
    .replace(/<p><table/g, '<table')
    .replace(/<\/table><\/p>/g, '</table>')
    .replace(/<p><ul>/g, '<ul>')
    .replace(/<\/ul><\/p>/g, '</ul>')
    .replace(/<p><ol>/g, '<ol>')
    .replace(/<\/ol><\/p>/g, '</ol>')
    .replace(/<p><blockquote/g, '<blockquote')
    .replace(/<\/blockquote><\/p>/g, '</blockquote>')
    .replace(/<p><pre/g, '<pre')
    .replace(/<\/pre><\/p>/g, '</pre>')
    .replace(/<p><\/p>/g, '')
    .replace(/(<li>.*<\/li>)/s, (match) => {
      if (match.includes('<li>') && !match.includes('<ul>') && !match.includes('<ol>')) {
        return `<ul class="list-disc list-inside my-4 space-y-2">${match}</ul>`;
      }
      return match;
    });
  
  // Add CSS classes to elements
  htmlContent = htmlContent
    .replace(/<h1/g, '<h1 class="text-3xl font-bold text-gray-900 mb-6"')
    .replace(/<h2/g, '<h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4"')
    .replace(/<h3/g, '<h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3"')
    .replace(/<h4/g, '<h4 class="text-lg font-semibold text-gray-900 mt-4 mb-2"')
    .replace(/<p>/g, '<p class="text-gray-700 leading-relaxed mb-4">')
    .replace(/<ul>/g, '<ul class="list-disc list-inside my-4 space-y-2 text-gray-700">')
    .replace(/<ol>/g, '<ol class="list-decimal list-inside my-4 space-y-2 text-gray-700">')
    .replace(/<li>/g, '<li class="ml-4">');
  
  return {
    htmlContent,
    toc,
    frontMatter
  };
}
