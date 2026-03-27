import { useEffect, useState } from 'react'
import { RichTextEditor, Link } from '@mantine/tiptap'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import { Color } from '@tiptap/extension-color'
import { TextStyle } from '@tiptap/extension-text-style'
import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Youtube from '@tiptap/extension-youtube'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { Typography } from '@tiptap/extension-typography'
import { CharacterCount } from '@tiptap/extension-character-count'
import { createLowlight, common } from 'lowlight'
import DOMPurify from 'dompurify'
import '@mantine/tiptap/styles.css'

type Props = {
  valueJson?: any
  valueHtml?: string
  onChange: (json: any, html: string, plainText: string) => void
  placeholder?: string
  className?: string
  minHeight?: string
}

// Custom image upload handler
const handleImageUpload = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.readAsDataURL(file)
  })
}

// Custom YouTube embed handler
const addYouTubeVideo = (editor: any) => {
  const url = prompt('Enter YouTube URL:')
  if (url) {
    editor.commands.setYoutubeVideo({
      src: url,
      width: 640,
      height: 480,
    })
  }
}

export default function RichTextEditorComponent({
  valueJson,
  valueHtml,
  onChange,
  placeholder = 'Start writing your content...',
  className = '',
  minHeight = '400px',
}: Props) {
  const [characterCount, setCharacterCount] = useState(0)
  
  // Create lowlight instance with common languages
  const lowlight = createLowlight(common)
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Highlight.configure({ multicolor: true }),
      Color,
      TextStyle,
      Placeholder.configure({ placeholder }),
      Image.configure({ 
        inline: false, 
        allowBase64: true,
      }),
      Subscript,
      Superscript,
      TaskList,
      TaskItem.configure({ 
        nested: true,
      }),
      Youtube.configure({ 
        controls: true,
        nocookie: true,
      }),
      Table.configure({ 
        resizable: true,
      }),
      TableRow,
      TableCell,
      TableHeader,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Typography,
      CharacterCount.configure({
        limit: 50000,
      }),
    ],
    content: valueHtml || '<p></p>',
    editable: true,
    autofocus: !valueHtml, // Auto focus only if no initial content
    onUpdate: ({ editor }) => {
      const json = editor.getJSON()
      const html = editor.getHTML()
      const sanitizedHtml = DOMPurify.sanitize(html, {
        ALLOWED_TAGS: [
          'p', 'br', 'strong', 'em', 'u', 's', 'code', 'pre',
          'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
          'ul', 'ol', 'li', 'blockquote', 'a',
          'div', 'span', 'img', 'mark',
          'sub', 'sup',
          'table', 'thead', 'tbody', 'tr', 'th', 'td',
          'input', 'hr', 'iframe',
        ],
        ALLOWED_ATTR: [
          'href', 'target', 'rel', 'class', 'style', 'src', 'alt', 
          'type', 'checked', 'data-*', 'width', 'height', 'frameborder',
          'allowfullscreen', 'allow', 'title', 'loading'
        ],
      })
      const count = editor.storage.characterCount?.characters() || 0
      setCharacterCount(count)
      onChange(json, sanitizedHtml, editor.getText())
    },
    onCreate: ({ editor }) => {
      console.log('Editor created successfully', editor)
    },
    onFocus: ({ editor }) => {
      console.log('Editor focused', editor)
    },
  })

  useEffect(() => {
    if (!editor) return
    
    // Only update if the content is different and not empty
    const incomingContent = valueHtml || ''
    const currentContent = editor.getHTML()
    
    // Avoid unnecessary updates that might interfere with typing
    if (incomingContent !== currentContent && incomingContent !== '<p></p>' && incomingContent !== '') {
      editor.commands.setContent(incomingContent, false)
    }
  }, [editor, valueHtml])

  // Click handler to focus editor
  const handleEditorClick = () => {
    if (editor && !editor.isFocused) {
      editor.commands.focus()
    }
  }

  // Custom handlers
  const insertImage = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        try {
          const src = await handleImageUpload(file)
          editor?.commands.setImage({ src, alt: file.name })
        } catch (error) {
          console.error('Error uploading image:', error)
        }
      }
    }
    input.click()
  }

  const insertTable = () => {
    editor?.commands.insertTable({ rows: 3, cols: 3, withHeaderRow: true })
  }

  const addYouTube = () => {
    addYouTubeVideo(editor)
  }

  const insertHardBreak = () => {
    editor?.commands.setHardBreak()
  }

  const toggleTaskList = () => {
    editor?.commands.toggleTaskList()
  }

  // Early return if editor is not ready
  if (!editor) {
    return (
      <div className="rich-text-editor-wrapper">
        <div style={{ minHeight, padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
          <p className="text-gray-500">Loading editor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="rich-text-editor-wrapper" onClick={handleEditorClick}>
      <RichTextEditor 
        editor={editor} 
        className={className} 
        style={{ 
          minHeight, 
          marginTop: 0, 
          border: 'none', 
          display: 'flex', 
          flexDirection: 'column',
          cursor: 'text',
          overflow: 'visible'
        }}
      >
        <RichTextEditor.Toolbar sticky={false}>

          {/* Text Formatting */}
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
          </RichTextEditor.ControlsGroup>

          {/* Text Style & Color */}
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Highlight />
            <RichTextEditor.ColorPicker
              colors={[
                '#25262b', '#868e96', '#fa5252', '#e64980', '#be4bdb',
                '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886',
                '#40c057', '#82c91e', '#fab005', '#fd7e14',
              ]}
            />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          {/* Headings */}
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          {/* Lists */}
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.TaskList />
          </RichTextEditor.ControlsGroup>

          {/* Alignment */}
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignRight />
            <RichTextEditor.AlignJustify />
          </RichTextEditor.ControlsGroup>

          {/* Blocks & Code */}
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Code />
            <RichTextEditor.CodeBlock />
            <RichTextEditor.Hr />
          </RichTextEditor.ControlsGroup>

          {/* Links & Media */}
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
            <RichTextEditor.Control
              onClick={insertImage}
              aria-label="Insert image"
              title="Insert image"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21,15 16,10 5,21"/>
              </svg>
            </RichTextEditor.Control>
          </RichTextEditor.ControlsGroup>

          {/* Table Controls */}
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Control
              onClick={insertTable}
              aria-label="Insert table"
              title="Insert table"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>
              </svg>
            </RichTextEditor.Control>
          </RichTextEditor.ControlsGroup>

          {/* History */}
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Undo />
            <RichTextEditor.Redo />
          </RichTextEditor.ControlsGroup>

        </RichTextEditor.Toolbar>

        <RichTextEditor.Content 
          style={{ 
            flex: 1, 
            minHeight: '400px',
            padding: '16px',
            fontSize: '16px',
            lineHeight: '1.6',
            cursor: 'text',
          }}
          onClick={handleEditorClick}
        />
      </RichTextEditor>

      {/* Character Count Display */}
      {editor && (
        <div className="flex justify-between items-center px-4 py-2 bg-gray-50 border-t text-xs text-gray-500">
          <div>
            Characters: {characterCount} / 50,000
          </div>
          <div>
            Words: {editor.storage.characterCount.words()}
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx>{`
        .rich-text-editor-wrapper {
          position: relative;
          overflow: visible;
        }
        
        .rich-text-editor-wrapper :global(.mantine-RichTextEditor-root) {
          overflow: visible;
        }
        
        .rich-text-editor-wrapper :global(.editor-image) {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 16px 0;
        }
        
        .rich-text-editor-wrapper :global(.editor-table) {
          border-collapse: collapse;
          margin: 16px 0;
          width: 100%;
        }
        
        .rich-text-editor-wrapper :global(.editor-table td),
        .rich-text-editor-wrapper :global(.editor-table th) {
          border: 1px solid #e5e7eb;
          padding: 8px 12px;
          text-align: left;
        }
        
        .rich-text-editor-wrapper :global(.editor-table th) {
          background-color: #f9fafb;
          font-weight: 600;
        }
        
        .rich-text-editor-wrapper :global(.code-block) {
          background: #f8f9fa;
          border: 1px solid #e9ecef;
          border-radius: 6px;
          padding: 16px;
          margin: 16px 0;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 14px;
          overflow-x: auto;
        }
        
        .rich-text-editor-wrapper :global(.horizontal-rule) {
          border: none;
          border-top: 2px solid #e5e7eb;
          margin: 24px 0;
        }
        
        .rich-text-editor-wrapper :global(.task-item) {
          display: flex;
          align-items: flex-start;
          gap: 8px;
        }
        
        .rich-text-editor-wrapper :global(.youtube-embed) {
          margin: 16px 0;
          border-radius: 8px;
          overflow: hidden;
        }
        
        .rich-text-editor-wrapper :global(.has-focus) {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
          border-radius: 4px;
        }
        
        .rich-text-editor-wrapper :global(.ProseMirror) {
          outline: none;
          cursor: text;
          min-height: 400px;
        }
        
        .rich-text-editor-wrapper :global(.ProseMirror:focus) {
          outline: none;
        }
        
        .rich-text-editor-wrapper :global(.mantine-RichTextEditor-content) {
          cursor: text;
        }
        
        .rich-text-editor-wrapper :global(.mantine-RichTextEditor-content:focus-within) {
          outline: none;
        }
        
        .rich-text-editor-wrapper :global(.ProseMirror p.is-editor-empty:first-child::before) {
          color: #9ca3af;
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }
        
        .rich-text-editor-wrapper :global(.ProseMirror blockquote) {
          border-left: 4px solid #e5e7eb;
          padding-left: 16px;
          margin: 16px 0;
          font-style: italic;
          color: #6b7280;
        }
        
        .rich-text-editor-wrapper :global(.ProseMirror h1) {
          font-size: 2.25rem;
          font-weight: 800;
          line-height: 1.2;
          margin: 24px 0 16px 0;
        }
        
        .rich-text-editor-wrapper :global(.ProseMirror h2) {
          font-size: 1.875rem;
          font-weight: 700;
          line-height: 1.3;
          margin: 20px 0 12px 0;
        }
        
        .rich-text-editor-wrapper :global(.ProseMirror h3) {
          font-size: 1.5rem;
          font-weight: 600;
          line-height: 1.4;
          margin: 16px 0 8px 0;
        }
        
        .rich-text-editor-wrapper :global(.ProseMirror h4) {
          font-size: 1.25rem;
          font-weight: 600;
          line-height: 1.5;
          margin: 12px 0 6px 0;
        }
        
        .rich-text-editor-wrapper :global(.ProseMirror ul),
        .rich-text-editor-wrapper :global(.ProseMirror ol) {
          padding-left: 24px;
          margin: 12px 0;
        }
        
        .rich-text-editor-wrapper :global(.ProseMirror li) {
          margin: 4px 0;
        }
        
        .rich-text-editor-wrapper :global(.ProseMirror code) {
          background: #f3f4f6;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 0.875em;
        }
        
        .rich-text-editor-wrapper :global(.ProseMirror a) {
          color: #3b82f6;
          text-decoration: underline;
          cursor: pointer;
        }
        
        .rich-text-editor-wrapper :global(.ProseMirror a:hover) {
          color: #1d4ed8;
        }
        
        .rich-text-editor-wrapper :global(.ProseMirror mark) {
          background: #fef3c7;
          padding: 1px 2px;
          border-radius: 2px;
        }
        
        .rich-text-editor-wrapper :global(.mantine-RichTextEditor-toolbar) {
          border-bottom: 1px solid #e5e7eb;
          background: #f9fafb;
          padding: 8px;
          flex-wrap: wrap;
          gap: 4px;
          position: relative;
          z-index: 1;
        }
        
        .rich-text-editor-wrapper :global(.mantine-RichTextEditor-content) {
          position: relative;
          z-index: 0;
          margin-top: 0;
        }
        
        .rich-text-editor-wrapper :global(.mantine-RichTextEditor-controlsGroup) {
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          background: white;
          padding: 2px;
        }
        
        .rich-text-editor-wrapper :global(.mantine-RichTextEditor-control) {
          border-radius: 4px;
          transition: all 0.15s ease;
        }
        
        .rich-text-editor-wrapper :global(.mantine-RichTextEditor-control:hover) {
          background: #f3f4f6;
        }
        
        .rich-text-editor-wrapper :global(.mantine-RichTextEditor-control[data-active]) {
          background: #3b82f6;
          color: white;
        }
      `}</style>
    </div>
  )
}
