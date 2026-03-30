import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import Image from "@tiptap/extension-image";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Youtube from "@tiptap/extension-youtube";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { Typography } from "@tiptap/extension-typography";
import { CharacterCount } from "@tiptap/extension-character-count";
import { createLowlight, common } from "lowlight";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code2,
  Highlighter,
  Heading1,
  Heading2,
  Heading3,
  Plus,
  ImagePlus,
  Italic,
  ListChecks,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Link as LinkIcon,
  Minus,
  Quote,
  Table2,
  Trash,
  Undo2,
  Redo2,
  Subscript as SubscriptIcon,
  Superscript as SuperscriptIcon,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  value: string;
  onChange: (nextValue: string) => void;
  placeholder?: string;
  minHeightClassName?: string;
}

function ToolbarButton({
  active,
  onClick,
  disabled,
  children,
}: Readonly<{
  active?: boolean;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}>) {
  return (
    <Button
      type="button"
      size="icon"
      variant={active ? "default" : "outline"}
      disabled={disabled}
      onClick={onClick}
      className="h-8 w-8"
    >
      {children}
    </Button>
  );
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Write content...",
  minHeightClassName = "min-h-44",
}: Readonly<RichTextEditorProps>) {
  const lowlight = createLowlight(common);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Keep explicit extensions below to avoid duplicate extension names.
        link: false,
        underline: false,
        codeBlock: false,
      }),
      Underline,
      Link.configure({ openOnClick: false, autolink: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight.configure({ multicolor: true }),
      Color,
      TextStyle,
      Image.configure({ inline: false, allowBase64: true }),
      Subscript,
      Superscript,
      TaskList,
      TaskItem.configure({ nested: true }),
      Youtube.configure({ controls: true, nocookie: true }),
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      CodeBlockLowlight.configure({ lowlight }),
      Typography,
      CharacterCount.configure({ limit: 50000 }),
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    onUpdate: ({ editor: current }) => {
      onChange(current.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (value !== editor.getHTML()) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
  }, [editor, value]);

  if (!editor) {
    return (
      <div
        className={cn("rounded-md border border-border", minHeightClassName)}
      />
    );
  }

  return (
    <div className="rounded-md border border-border overflow-hidden bg-background">
      <div className="flex flex-wrap items-center gap-2 border-b border-border p-2 bg-muted/30">
        <ToolbarButton
          active={editor.isActive("heading", { level: 1 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          <Heading1 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("heading", { level: 2 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <Heading2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("heading", { level: 3 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <Heading3 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("heading", { level: 4 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
        >
          <span className="text-[10px] font-semibold leading-none">H4</span>
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("highlight")}
          onClick={() => editor.chain().focus().toggleHighlight().run()}
        >
          <Highlighter className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("subscript")}
          onClick={() => editor.chain().focus().toggleSubscript().run()}
        >
          <SubscriptIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("superscript")}
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
        >
          <SuperscriptIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("taskList")}
          onClick={() => editor.chain().focus().toggleTaskList().run()}
        >
          <ListChecks className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive({ textAlign: "left" })}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          <AlignLeft className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive({ textAlign: "center" })}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          <AlignCenter className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive({ textAlign: "right" })}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          <AlignRight className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive({ textAlign: "justify" })}
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        >
          <AlignJustify className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <Quote className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("codeBlock")}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          <Code2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <Minus className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("link")}
          onClick={() => {
            const previous = editor.getAttributes("link").href as
              | string
              | undefined;
            const href = globalThis.prompt("Enter URL", previous || "https://");
            if (!href) {
              editor.chain().focus().unsetLink().run();
              return;
            }
            editor.chain().focus().setLink({ href }).run();
          }}
        >
          <LinkIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            const src = globalThis.prompt("Image URL", "https://");
            if (!src) return;
            editor.chain().focus().setImage({ src }).run();
          }}
        >
          <ImagePlus className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run();
          }}
        >
          <Table2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          disabled={!editor.can().addRowAfter()}
          onClick={() => editor.chain().focus().addRowAfter().run()}
        >
          <span className="flex items-center gap-0.5 text-[10px] font-semibold leading-none">
            R
            <Plus className="h-3 w-3" />
          </span>
        </ToolbarButton>
        <ToolbarButton
          disabled={!editor.can().deleteRow()}
          onClick={() => editor.chain().focus().deleteRow().run()}
        >
          <span className="flex items-center gap-0.5 text-[10px] font-semibold leading-none">
            R
            <Trash className="h-3 w-3" />
          </span>
        </ToolbarButton>
        <ToolbarButton
          disabled={!editor.can().addColumnAfter()}
          onClick={() => editor.chain().focus().addColumnAfter().run()}
        >
          <span className="flex items-center gap-0.5 text-[10px] font-semibold leading-none">
            C
            <Plus className="h-3 w-3" />
          </span>
        </ToolbarButton>
        <ToolbarButton
          disabled={!editor.can().deleteColumn()}
          onClick={() => editor.chain().focus().deleteColumn().run()}
        >
          <span className="flex items-center gap-0.5 text-[10px] font-semibold leading-none">
            C
            <Trash className="h-3 w-3" />
          </span>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            const src = globalThis.prompt(
              "YouTube URL",
              "https://www.youtube.com/watch?v=",
            );
            if (!src) return;
            editor
              .chain()
              .focus()
              .setYoutubeVideo({ src, width: 640, height: 360 })
              .run();
          }}
        >
          <Video className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            const color = globalThis.prompt("Text color (hex)", "#111827");
            if (!color) return;
            editor.chain().focus().setColor(color).run();
          }}
        >
          A
        </ToolbarButton>
        <div className="flex items-center gap-2 sm:ml-auto">
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
          >
            <Undo2 className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
          >
            <Redo2 className="h-4 w-4" />
          </ToolbarButton>
        </div>
      </div>

      <EditorContent
        editor={editor}
        className={cn(
          "tiptap-content prose prose-sm max-w-none p-3 focus-within:outline-none",
          "[&_table]:table-fixed [&_table]:border-collapse [&_table]:w-full [&_td]:border [&_th]:border [&_td]:border-border [&_th]:border-border",
          "[&_td]:p-2 [&_th]:p-2 [&_th]:bg-muted/30 [&_td]:align-top [&_th]:align-top",
          "[&_td]:max-w-0 [&_th]:max-w-0 [&_td]:wrap-break-word [&_th]:wrap-break-word [&_td]:whitespace-pre-wrap [&_th]:whitespace-pre-wrap",
          "[&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-44",
          minHeightClassName,
        )}
      />

      <div className="flex items-center justify-between border-t border-border px-3 py-2 text-xs text-muted-foreground bg-muted/20">
        <span>
          Characters: {editor.storage.characterCount.characters()} / 50,000
        </span>
        <span>Words: {editor.storage.characterCount.words()}</span>
      </div>
    </div>
  );
}
