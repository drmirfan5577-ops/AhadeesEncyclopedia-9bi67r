import { useState, useCallback } from 'react';

export interface Note {
  id: string;
  hadeesId: string;
  content: string;
  color: string;
  createdAt: number;
  updatedAt: number;
  tags: string[];
}

const NOTES_KEY = 'ahadees_notes_v1';

const COLORS = ['#fef9c3', '#dbeafe', '#dcfce7', '#fce7f3', '#e0e7ff', '#fff7ed'];

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>(() => {
    try {
      const stored = localStorage.getItem(NOTES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  const save = useCallback((updated: Note[]) => {
    setNotes(updated);
    localStorage.setItem(NOTES_KEY, JSON.stringify(updated));
  }, []);

  const addNote = useCallback((hadeesId: string, content: string, color = COLORS[0], tags: string[] = []) => {
    const note: Note = {
      id: `note_${Date.now()}`,
      hadeesId,
      content,
      color,
      tags,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    save([...notes, note]);
    return note;
  }, [notes, save]);

  const updateNote = useCallback((id: string, content: string, color?: string, tags?: string[]) => {
    save(notes.map((n) => n.id === id
      ? { ...n, content, color: color ?? n.color, tags: tags ?? n.tags, updatedAt: Date.now() }
      : n));
  }, [notes, save]);

  const deleteNote = useCallback((id: string) => {
    save(notes.filter((n) => n.id !== id));
  }, [notes, save]);

  const getNotesForHadees = useCallback((hadeesId: string) => {
    return notes.filter((n) => n.hadeesId === hadeesId);
  }, [notes]);

  return { notes, addNote, updateNote, deleteNote, getNotesForHadees, NOTE_COLORS: COLORS };
}
