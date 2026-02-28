'use client';

import { useRef, useEffect, useCallback } from 'react';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';

interface BlockNoteEditorProps {
  initialHTML?: string;
  onChange: (html: string) => void;
}

const fundacioTheme = {
  light: {
    colors: {
      editor: {
        text: '#4a4a4a',
        background: '#FFFFFF',
      },
      menu: {
        text: '#1a1a1a',
        background: '#FFFFFF',
      },
      tooltip: {
        text: '#FFFFFF',
        background: '#1a1a1a',
      },
      hovered: {
        text: '#1a1a1a',
        background: '#F5EDE3',
      },
      selected: {
        text: '#FFFFFF',
        background: '#E8722A',
      },
      disabled: {
        text: '#8a8a8a',
        background: '#F5EDE3',
      },
      shadow: 'rgba(0,0,0,0.08)',
      border: 'rgba(26,26,26,0.1)',
      sideMenu: '#8a8a8a',
      highlights: {
        gray: { text: '#1a1a1a', background: '#F5EDE3' },
        brown: { text: '#1a1a1a', background: '#F5EDE3' },
        red: { text: '#1a1a1a', background: '#fde8e8' },
        orange: { text: '#1a1a1a', background: '#FFF3E8' },
        yellow: { text: '#1a1a1a', background: '#FFF8E1' },
        green: { text: '#1a1a1a', background: '#E8F5E9' },
        blue: { text: '#1a1a1a', background: '#E3F2FD' },
        purple: { text: '#1a1a1a', background: '#F3E5F5' },
        pink: { text: '#1a1a1a', background: '#FCE4EC' },
      },
    },
    borderRadius: 8,
    fontFamily: 'var(--font-inter), system-ui, sans-serif',
  },
} as const;

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

  // Load initial HTML only once on mount
  const loaded = useRef(false);
  const userHasEdited = useRef(false);
  useEffect(() => {
    if (loaded.current || !initialHTML || !editor) return;
    loaded.current = true;
    (async () => {
      try {
        const blocks = await editor.tryParseHTMLToBlocks(initialHTML);
        editor.replaceBlocks(editor.document, blocks);
        // Allow a tick for BlockNote to settle after replaceBlocks,
        // then enable onChange tracking
        setTimeout(() => {
          userHasEdited.current = true;
        }, 200);
      } catch {
        // ignore parse errors on initial load
        userHasEdited.current = true;
      }
    })();
  }, [initialHTML, editor]);

  const handleChange = useCallback(async () => {
    // Skip the onChange fired by initial HTML parse + replaceBlocks
    if (!userHasEdited.current) return;
    const html = await editor.blocksToFullHTML(editor.document);
    onChange(html);
  }, [editor, onChange]);

  return (
    <div className="border border-charcoal/10 rounded-xl overflow-hidden bg-white min-h-[500px]" data-mantine-color-scheme="light">
      <BlockNoteView
        editor={editor}
        onChange={handleChange}
        theme="light"
      />
    </div>
  );
}
