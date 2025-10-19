'use client';

import { FC, useState } from 'react';

interface VoiceNotesProps {
  notes: string[];
  onAddNote: (note: string) => void;
  onDeleteNote: (index: number) => void;
}

export const VoiceNotes: FC<VoiceNotesProps> = ({ notes, onAddNote, onDeleteNote }) => {
  const [textNote, setTextNote] = useState('');

  const addTextNote = () => {
    if (textNote.trim()) {
      onAddNote(textNote.trim());
      setTextNote('');
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <textarea
          value={textNote}
          onChange={(e) => setTextNote(e.target.value)}
          placeholder="Type a note..."
          className="flex-1 p-2 border-2 border-navy rounded text-sm resize-none"
          rows={2}
        />
        <button
          type="button"
          onClick={addTextNote}
          className="px-4 py-2 bg-gold text-navy font-semibold rounded hover:bg-opacity-90 transition-colors text-sm whitespace-nowrap"
        >
          Add Note
        </button>
      </div>

      <div className="space-y-2 max-h-48 overflow-y-auto">
        {notes.map((note, index) => (
          <div
            key={index}
            className="flex items-start gap-2 p-2 bg-white border border-gray-300 rounded text-sm"
          >
            <span className="flex-1 text-navy">{note}</span>
            <button
              type="button"
              onClick={() => onDeleteNote(index)}
              className="text-red-600 hover:text-red-800 font-bold"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
