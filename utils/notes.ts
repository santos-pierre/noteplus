import { Note } from '../redux/types/NotesState';

export const findNote = (notes: Array<Note>, note_id: string) => {
    return notes.find((note) => note.id === note_id);
};
