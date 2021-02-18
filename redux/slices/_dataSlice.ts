import { FolderItem, EditItemPayload, NoteItem, NoteState } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const INITIAL_STATE: NoteState = {
    folders: [
        {
            id: '1',
            name: 'pierre 1',
        },
        {
            id: '2',
            name: 'folder 2',
        },
        {
            id: '3',
            name: 'folder 3',
        },
    ],
    notes: [
        {
            id: 'f99ea68a-b12c-466b-8ea4-47ed2941a82d',
            name: 'File 1',
            folderId: '1',
            content: 'Bébé tout beau',
            lastUpdated: '',
        },
        {
            id: 'f8fd1937-b866-44cc-ab4e-7df260ee827d',
            name: 'File with no Folder',
            folderId: 'null',
            content: '## Second Title',
            lastUpdated: '',
        },
        {
            id: '9993faf4-cf9e-432f-8432-618a1f0be5cb',
            name: 'File 2',
            folderId: '1',
            content: '',
            lastUpdated: '',
        },
        {
            id: '86a93cbb-d105-4e53-aa64-13aaf5a5792e',
            name: 'File 3',
            folderId: '2',
            content: '',
            lastUpdated: '',
        },
    ],
    activeFolder: '',
    activeNote: '',
    error: '',
    loading: false,
};

const dataSlice = createSlice({
    name: 'datas',
    initialState: INITIAL_STATE,
    reducers: {
        // Folders
        addFolder: (state, { payload }: PayloadAction<FolderItem>) => {
            state.folders.push(payload);
        },

        updateFolder: (state, { payload }: PayloadAction<EditItemPayload>) => {
            state.folders = state.folders.map((folder) =>
                folder.id === payload.id ? { ...folder, name: payload.name } : folder
            );
        },

        deleteFolder: (state, { payload }: PayloadAction<string>) => {
            state.folders = state.folders.filter((folder) => folder.id !== payload);
            state.notes = state.notes.filter((note) => note.folderId !== payload);
        },

        // Notes
        addNote: (state, { payload }: PayloadAction<NoteItem>) => {
            state.notes.push(payload);
        },

        updateNote: (state, { payload }: PayloadAction<EditItemPayload>) => {
            state.notes = state.notes.map((note) =>
                note.id === payload.id
                    ? {
                          ...note,
                          name: payload.name,
                          content: payload.content,
                          folder_id: payload.folder_id,
                          lastUpdated: payload.lastUpdate,
                      }
                    : note
            );
        },

        deleteNote: (state, { payload }: PayloadAction<string>) => {
            state.notes = state.notes.filter((note) => note.id !== payload);
        },

        // Active
        updateActiveFolder: (state, { payload }: PayloadAction<string>) => {
            state.activeFolder = payload;
        },

        updateActiveNote: (state, { payload }: PayloadAction<string>) => {
            state.activeNote = payload;
        },

        // Error
        updateError: (state, { payload }: PayloadAction<string>) => {
            state.error = payload;
        },
    },
});

export const {
    addFolder,
    addNote,
    deleteFolder,
    deleteNote,
    updateActiveFolder,
    updateActiveNote,
    updateError,
    updateFolder,
    updateNote,
} = dataSlice.actions;

export default dataSlice.reducer;
