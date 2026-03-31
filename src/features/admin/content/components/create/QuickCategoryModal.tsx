import React from "react";
import { Plus, Loader } from "lucide-react";
import Modal from "../../../shared/components/Modal";

interface Props {
  isOpen: boolean;
  isCreating: boolean;
  newCategory: { name: string; slug: string; description: string };
  onChange: (updates: Partial<{ name: string; slug: string; description: string }>) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function QuickCategoryModal({ isOpen, isCreating, newCategory, onChange, onClose, onSubmit }: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => !isCreating && onClose()}
      title="Quick Category"
      size="md"
      footer={
        <div className="flex items-center justify-between w-full">
          <button type="button" onClick={onClose} disabled={isCreating}
            className="text-xs font-bold text-gray-400 hover:text-black">Cancel</button>
          <button type="button" onClick={onSubmit} disabled={isCreating}
            className="px-6 py-2 bg-black text-white text-xs font-bold rounded-lg hover:bg-gray-800 disabled:bg-gray-200 transition-all flex items-center gap-2">
            {isCreating ? <Loader className="animate-spin" size={14} /> : <Plus size={14} />}
            {isCreating ? "Creating..." : "Create Category"}
          </button>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Name</label>
          <input type="text" value={newCategory.name} autoFocus
            onChange={(e) => {
              const val = e.target.value;
              const timestamp = Date.now().toString().slice(-6);
              const baseSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
              const slug = baseSlug ? `${baseSlug}-${timestamp}` : timestamp;
              onChange({ name: val, slug });
            }}
            className="w-full px-0 py-1 bg-transparent border-b border-gray-100 focus:border-black text-sm font-bold outline-none transition-all placeholder:text-gray-200"
            placeholder="e.g. Technology & Innovation" />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Slug</label>
          <input type="text" value={newCategory.slug}
            onChange={(e) => onChange({ slug: e.target.value })}
            className="w-full px-0 py-1 bg-transparent border-b border-gray-100 focus:border-black text-xs font-mono outline-none transition-all placeholder:text-gray-200"
            placeholder="e.g. tech-innovation" />
        </div>
      </div>
    </Modal>
  );
}
