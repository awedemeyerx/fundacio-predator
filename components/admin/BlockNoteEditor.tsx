'use client';

import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';

interface BlockNoteEditorProps {
  initialHTML?: string;
  onChange: (html: string) => void;
}

export default function BlockNoteEditor({ initialHTML, onChange }: BlockNoteEditorProps) {
  const editor = useCreateBlockNote({
    initialContent: undefined,
    uploadFile: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
      const data = await res.json();
      return data.url;
    },
  });

  // Load initial HTML content
  if (initialHTML && editor) {
    (async () => {
      try {
        const blocks = await editor.tryParseHTMLToBlocks(initialHTML);
        editor.replaceBlocks(editor.document, blocks);
      } catch {
        // ignore parse errors on initial load
      }
    })();
  }

  return (
    <div className="border border-charcoal/10 rounded-xl overflow-hidden bg-white min-h-[400px]">
      <BlockNoteView
        editor={editor}
        onChange={async () => {
          const html = await editor.blocksToHTMLLossy(editor.document);
          onChange(html);
        }}
        theme="light"
      />
    </div>
  );
}
