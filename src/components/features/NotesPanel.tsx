import { useState } from 'react';
import { Plus, Trash2, Edit, Save, X, StickyNote } from 'lucide-react';
import { Note, useNotes } from '@/hooks/useNotes';
import { toast } from 'sonner';

interface NotesPanelProps {
  hadeesId: string;
  hadeesArabic?: string;
  onClose: () => void;
}

export default function NotesPanel({ hadeesId, hadeesArabic, onClose }: NotesPanelProps) {
  const { getNotesForHadees, addNote, updateNote, deleteNote, NOTE_COLORS } = useNotes();
  const notes = getNotesForHadees(hadeesId);

  const [newText, setNewText] = useState('');
  const [newColor, setNewColor] = useState(NOTE_COLORS[0]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [editColor, setEditColor] = useState('');
  const [showAdd, setShowAdd] = useState(false);

  const handleAdd = () => {
    if (!newText.trim()) return;
    addNote(hadeesId, newText.trim(), newColor);
    setNewText('');
    setNewColor(NOTE_COLORS[0]);
    setShowAdd(false);
    toast.success('Note saved! • نوٹ محفوظ ہوا');
  };

  const handleEditSave = (id: string) => {
    if (!editText.trim()) return;
    updateNote(id, editText.trim(), editColor);
    setEditId(null);
    toast.success('Note updated! • نوٹ اپڈیٹ ہوا');
  };

  const handleDelete = (id: string) => {
    deleteNote(id);
    toast.success('Note deleted! • نوٹ حذف ہوا');
  };

  const formatDate = (ts: number) => new Date(ts).toLocaleDateString('ur-PK', { day: 'numeric', month: 'short' });

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.97)', border: '1.5px solid rgba(14,165,233,0.3)', boxShadow: '0 8px 32px rgba(14,165,233,0.15)' }}>
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between" style={{ background: 'linear-gradient(90deg, rgba(14,165,233,0.1), rgba(255,255,255,0.95))', borderBottom: '1px solid rgba(14,165,233,0.12)' }}>
        <div className="flex items-center gap-2">
          <StickyNote size={14} style={{ color: '#0369a1' }} />
          <span className="text-xs font-bold" style={{ color: '#0369a1' }}>نوٹس • Notes ({notes.length})</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowAdd(!showAdd)}
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(14,165,233,0.12)', border: '1px solid rgba(14,165,233,0.3)' }}>
            <Plus size={13} style={{ color: '#0369a1' }} />
          </button>
          <button onClick={onClose} className="text-gray-400" style={{ minWidth: 24, minHeight: 24 }}>
            <X size={14} />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Add Note */}
        {showAdd && (
          <div className="p-3 rounded-xl animate-slide-up" style={{ background: 'rgba(14,165,233,0.06)', border: '1.5px solid rgba(14,165,233,0.25)' }}>
            <p className="text-xs font-bold mb-2" style={{ color: '#0369a1' }}>نیا نوٹ • New Note</p>
            <textarea value={newText} onChange={(e) => setNewText(e.target.value)}
              rows={3} placeholder="اپنا نوٹ یہاں لکھیں... | Write your note here..."
              className="w-full text-sm p-2.5 rounded-xl outline-none resize-none"
              style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(14,165,233,0.2)', color: '#333', fontFamily: 'inherit' }} />
            <div className="flex items-center gap-2 mt-2">
              <div className="flex gap-1">
                {NOTE_COLORS.map((c) => (
                  <button key={c} onClick={() => setNewColor(c)}
                    className="w-5 h-5 rounded-full transition-all"
                    style={{ background: c, border: newColor === c ? '2px solid #0369a1' : '1px solid rgba(0,0,0,0.15)', transform: newColor === c ? 'scale(1.2)' : 'scale(1)' }} />
                ))}
              </div>
              <div className="flex-1" />
              <button onClick={() => setShowAdd(false)} className="text-xs text-gray-400 px-2 py-1 rounded" style={{ minHeight: 28 }}>Cancel</button>
              <button onClick={handleAdd}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-white"
                style={{ background: '#0369a1', minHeight: 32 }}>
                <Save size={11} /><span>Save</span>
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {notes.length === 0 && !showAdd && (
          <div className="text-center py-6">
            <StickyNote size={32} style={{ color: 'rgba(14,165,233,0.3)', margin: '0 auto 12px' }} />
            <p className="text-sm text-gray-500 font-medium">کوئی نوٹ نہیں • No notes yet</p>
            <p className="text-xs text-gray-400 mt-1">Tap + to add your first note</p>
            <button onClick={() => setShowAdd(true)}
              className="mt-3 px-4 py-2 rounded-xl text-xs font-bold"
              style={{ background: 'rgba(14,165,233,0.1)', border: '1px solid rgba(14,165,233,0.3)', color: '#0369a1', minHeight: 36 }}>
              + نوٹ شامل کریں
            </button>
          </div>
        )}

        {/* Notes List */}
        {notes.map((note: Note) => (
          <div key={note.id} className="p-3 rounded-xl relative" style={{ background: note.color, border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            {editId === note.id ? (
              <>
                <textarea value={editText} onChange={(e) => setEditText(e.target.value)}
                  rows={3} className="w-full text-sm p-2 rounded-lg outline-none resize-none mb-2"
                  style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(0,0,0,0.1)', color: '#333' }} />
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {NOTE_COLORS.map((c) => (
                      <button key={c} onClick={() => setEditColor(c)}
                        className="w-4 h-4 rounded-full"
                        style={{ background: c, border: editColor === c ? '2px solid #333' : '1px solid rgba(0,0,0,0.15)' }} />
                    ))}
                  </div>
                  <div className="flex-1" />
                  <button onClick={() => setEditId(null)} className="text-xs text-gray-500 px-2 py-1" style={{ minHeight: 28 }}>Cancel</button>
                  <button onClick={() => handleEditSave(note.id)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-white"
                    style={{ background: '#0369a1', minHeight: 32 }}>
                    <Save size={11} /><span>Save</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm text-gray-800 leading-relaxed mb-2 whitespace-pre-wrap">{note.content}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-500">{formatDate(note.createdAt)}</span>
                  <div className="flex gap-1">
                    <button onClick={() => { setEditId(note.id); setEditText(note.content); setEditColor(note.color); }}
                      className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{ background: 'rgba(0,0,0,0.08)' }}>
                      <Edit size={11} color="#6b7280" />
                    </button>
                    <button onClick={() => handleDelete(note.id)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{ background: 'rgba(220,38,38,0.08)' }}>
                      <Trash2 size={11} color="#dc2626" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
