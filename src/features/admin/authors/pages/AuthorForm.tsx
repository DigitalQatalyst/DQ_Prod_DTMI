import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AppLayout from '../../shared/components/AppLayout';
import { authorService, Author } from '../../shared/utils/supabase';
import { Toast, ToastType } from '../../shared/components/Toast';
import { RichTextEditor, Link as TiptapLink } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import '@mantine/tiptap/styles.css';
import {
  ArrowLeft,
  Camera,
  CheckCircle2,
  Linkedin,
  Loader,
  Plus,
  User as UserIcon,
  X as XIcon,
} from 'lucide-react';

function BioEditor({ value, onChange }: { value: string; onChange: (html: string) => void }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TiptapLink,
      Placeholder.configure({ placeholder: 'Write a detailed bio for this author...' }),
    ],
    content: value || '',
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  useEffect(() => {
    if (!editor) return;
    if (value !== editor.getHTML()) editor.commands.setContent(value || '');
  }, [value]);

  return (
    <RichTextEditor editor={editor} style={{ border: '1px solid #f3f4f6', borderRadius: '12px', overflow: 'hidden' }}>
      <RichTextEditor.Toolbar style={{ borderBottom: '1px solid #f3f4f6', background: '#fafafa' }}>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.ClearFormatting />
        </RichTextEditor.ControlsGroup>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
        </RichTextEditor.ControlsGroup>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>
      <RichTextEditor.Content style={{ minHeight: '200px', fontSize: '14px' }} />
    </RichTextEditor>
  );
}

const CONTRIBUTOR_TYPES = [
  'Research Leadership',
  'Human Intelligence Analysts',
  'AI Research Agents',
  'Editorial Publication Team',
];

const AuthorForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState<Partial<Author>>({
    name: '',
    title: '',
    bio: '',
    bioHtml: '',
    linkedIn: '',
    twitter: '',
    affiliation: 'DigitalQatalyst',
    contributorType: '',
    subCategory: '',
    expertise: '',
    tags: [],
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [loading, setLoading] = useState(isEdit);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  useEffect(() => {
    if (!isEdit) return;
    authorService.getAuthorById(id!).then((author) => {
      setForm(author);
      setAvatarPreview(author.avatar || '');
    }).catch(() => {
      setToast({ message: 'Failed to load author', type: 'error' });
    }).finally(() => setLoading(false));
  }, [id]);

  const set = (field: keyof Author, value: any) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name?.trim() || !form.title?.trim()) {
      setToast({ message: 'Name and Title are required', type: 'error' });
      return;
    }
    setIsSubmitting(true);
    try {
      let avatarUrl = form.avatar || '';
      if (avatarFile) avatarUrl = await authorService.uploadAvatar(avatarFile);

      if (isEdit) {
        await authorService.updateAuthor(id!, { ...form, avatar: avatarUrl });
        setToast({ message: 'Author updated', type: 'success' });
      } else {
        await authorService.createAuthor({ ...form, avatar: avatarUrl });
        setToast({ message: 'Author created', type: 'success' });
      }
      setTimeout(() => navigate('/admin-ui/authors'), 800);
    } catch (err: any) {
      setToast({ message: err.message, type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <AppLayout title={isEdit ? 'Edit Author' : 'New Author'}>
        <div className="flex items-center justify-center h-64 text-gray-400">
          <Loader className="animate-spin" size={28} />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title={isEdit ? 'Edit Author' : 'New Author'}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate('/admin-ui/authors')}
            className="group flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-all"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Authors
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 disabled:bg-gray-300 transition-all"
          >
            {isSubmitting ? <Loader className="animate-spin" size={14} /> : (isEdit ? <CheckCircle2 size={14} /> : <Plus size={14} />)}
            {isSubmitting ? 'Saving...' : (isEdit ? 'Update Author' : 'Create Author')}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column — avatar + identity */}
          <div className="space-y-6">
            {/* Avatar */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-28 h-28 rounded-2xl bg-gray-50 border border-gray-100 overflow-hidden flex items-center justify-center">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <UserIcon size={36} className="text-gray-300" />
                  )}
                </div>
                <input type="file" id="avatar-upload" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                <label
                  htmlFor="avatar-upload"
                  className="absolute -bottom-2 -right-2 p-2 bg-white border border-gray-200 rounded-full shadow-md cursor-pointer hover:bg-gray-50 transition-all"
                >
                  <Camera size={14} />
                </label>
                {avatarPreview && (
                  <button
                    type="button"
                    onClick={() => { setAvatarPreview(''); setAvatarFile(null); set('avatar', ''); }}
                    className="absolute -top-2 -right-2 p-1 bg-white border border-gray-200 rounded-full shadow-md hover:bg-red-50 hover:border-red-200 transition-all"
                  >
                    <XIcon size={12} className="text-gray-500" />
                  </button>
                )}
              </div>
              <p className="text-xs text-gray-400 text-center">Click the camera icon to upload a photo</p>
            </div>

            {/* Social links */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Social Links</p>
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs text-gray-500 flex items-center gap-1.5"><Linkedin size={11} /> LinkedIn</label>
                  <input
                    type="url"
                    value={form.linkedIn || ''}
                    onChange={e => set('linkedIn', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-xs focus:ring-1 focus:ring-gray-300 outline-none"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-500">X (Twitter)</label>
                  <input
                    type="url"
                    value={form.twitter || ''}
                    onChange={e => set('twitter', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-xs focus:ring-1 focus:ring-gray-300 outline-none"
                    placeholder="https://x.com/username"
                  />
                </div>
              </div>
            </div>

            {/* Contributor profile */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Contributor Profile</p>
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs text-gray-500">Contributor Type</label>
                  <select
                    value={form.contributorType || ''}
                    onChange={e => set('contributorType', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-xs focus:ring-1 focus:ring-gray-300 outline-none"
                  >
                    <option value="">— None —</option>
                    {CONTRIBUTOR_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-500">Sub-Category</label>
                  <input
                    type="text"
                    value={form.subCategory || ''}
                    onChange={e => set('subCategory', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-xs focus:ring-1 focus:ring-gray-300 outline-none"
                    placeholder="e.g. Research Director"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-500">Affiliation</label>
                  <input
                    type="text"
                    value={form.affiliation || ''}
                    onChange={e => set('affiliation', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-xs focus:ring-1 focus:ring-gray-300 outline-none"
                    placeholder="DigitalQatalyst"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-500">Expertise</label>
                  <input
                    type="text"
                    value={form.expertise || ''}
                    onChange={e => set('expertise', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-xs focus:ring-1 focus:ring-gray-300 outline-none"
                    placeholder="e.g. DCO Strategy, Applied AI"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-500">Tags <span className="text-gray-400">(comma-separated)</span></label>
                  <input
                    type="text"
                    value={(form.tags || []).join(', ')}
                    onChange={e => set('tags', e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-xs focus:ring-1 focus:ring-gray-300 outline-none"
                    placeholder="e.g. Visionary, Analyst"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right column — main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Identity */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Identity</p>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs text-gray-500">Full Name <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    value={form.name || ''}
                    onChange={e => set('name', e.target.value)}
                    required
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-lg text-sm font-semibold focus:ring-1 focus:ring-gray-300 outline-none"
                    placeholder="e.g. Stéphane Niango"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-500">Professional Title <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    value={form.title || ''}
                    onChange={e => set('title', e.target.value)}
                    required
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:ring-1 focus:ring-gray-300 outline-none"
                    placeholder="e.g. Expert in DCOs & Strategic Transformation"
                  />
                </div>
              </div>
            </div>

            {/* Short bio */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-3">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Short Bio</p>
                <p className="text-xs text-gray-400 mt-0.5">One-line tagline shown on author cards and contributor listings</p>
              </div>
              <input
                type="text"
                value={form.bio || ''}
                onChange={e => set('bio', e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:ring-1 focus:ring-gray-300 outline-none"
                placeholder="A concise summary of this author's expertise..."
              />
            </div>

            {/* Detailed bio */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-3">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Detailed Bio</p>
                <p className="text-xs text-gray-400 mt-0.5">Full biography shown on the author's profile page</p>
              </div>
              <BioEditor
                value={form.bioHtml || form.bio || ''}
                onChange={(html) => set('bioHtml', html)}
              />
            </div>
          </div>
        </div>
      </form>
    </AppLayout>
  );
};

export default AuthorForm;
