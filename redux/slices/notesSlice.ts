import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    EditFolderAction,
    newNote,
    Folder,
    newFolder,
    NotesState,
    Note,
    EditNoteAction,
} from '../types/NotesState';
import { RootState } from '../types/RootState';
import { v4 as uuidv4 } from 'uuid';
import { AppStatus } from '../../enum/AppStatus';
import { AppElement } from '../../enum/AppElement';

const initialState: NotesState = {
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
            folder_id: '1',
            content: 'Bébé tout beau',
        },
        {
            id: 'f8fd1937-b866-44cc-ab4e-7df260ee827d',
            name: 'File with no Folder',
            folder_id: null,
            content: '## Second Title',
        },
        {
            id: '9993faf4-cf9e-432f-8432-618a1f0be5cb',
            name: 'File 2',
            folder_id: '1',
            content: '',
        },
        {
            id: '86a93cbb-d105-4e53-aa64-13aaf5a5792e',
            name: 'File 3',
            folder_id: '2',
            content: '',
        },
    ],
    currentFolder: null,
    currentNote: null,
    appStatus: AppStatus.NONE,
    appElementType: AppElement.NONE,
};

const foldersSlice = createSlice({
    name: 'datas',
    initialState,
    reducers: {
        // Folders Actions
        addFolder: (state, action: PayloadAction<newFolder>) => {
            if (action.payload.name.trim()) {
                let newFolder: Folder = {
                    id: uuidv4(),
                    name: action.payload.name,
                };
                state.folders.push(newFolder);
            }
        },
        removeFolder: (state, action: PayloadAction<string>) => {
            state.folders.filter((folder) => {
                return folder.id !== action.payload;
            });
        },
        editFolder: (state, action: PayloadAction<EditFolderAction>) => {
            let indexFolder = state.folders.findIndex((folder) => {
                return folder.id === action.payload.id;
            });
            if (indexFolder) {
                state.folders[indexFolder].name = action.payload.newName;
            }
        },
        // Notes
        addNote: (state, action: PayloadAction<newNote>) => {
            if (action.payload.name.trim()) {
                let newNote: Note = {
                    id: uuidv4(),
                    name: action.payload.name,
                    folder_id: action.payload.folder_id,
                    content: '',
                };
                state.notes.push(newNote);
            }
        },
        removeNote: (state, action: PayloadAction<string>) => {
            state.notes.filter((note) => {
                return note.id !== action.payload;
            });
        },
        editNote: (state, action: PayloadAction<EditNoteAction>) => {
            let indexFile = state.notes.findIndex((note) => {
                return note.id === action.payload.id;
            });
            if (indexFile !== -1) {
                state.notes[indexFile].name = action.payload.newName;
                state.notes[indexFile].content = action.payload.content;
                if (action.payload.folder_name) {
                    let folder = getFolderByName(state.folders, action.payload.folder_name);
                    if (folder) {
                        state.notes[indexFile].folder_id = folder.id;
                    } else {
                        state.notes[indexFile].folder_id = null;
                    }
                }
            }
        },
        // Select Folder
        selectFolder: (state, action: PayloadAction<Folder | null | string>) => {
            if (typeof action.payload === 'string') {
                let folder = state.folders.find((folder) => folder.id === action.payload);
                if (folder) {
                    state.currentFolder = folder;
                }
            } else {
                state.currentFolder = action.payload;
            }
        },
        // Select Note
        selectNote: (state, action: PayloadAction<Note>) => {
            if (!action.payload.folder_id) {
                state.currentFolder = null;
            }
            state.currentNote = action.payload;
        },
        // App Status
        updateStatus: (state, action: PayloadAction<string>) => {
            state.appStatus = action.payload;
        },

        // App Element
        updateAppElement: (state, action: PayloadAction<string>) => {
            state.appElementType = action.payload;
        },
    },
});

/*
 * Selectors
 */

export const getFolders = (state: RootState) => state.datas.folders;
export const getNotes = (state: RootState) => state.datas.notes;
export const getCurrentNote = (state: RootState) => state.datas.currentNote;
export const getCurrentFolder = (state: RootState) => state.datas.currentFolder;
export const getCurrentAppStatus = (state: RootState) => state.datas.appStatus;
export const getCurrentAppElement = (state: RootState) => state.datas.appElementType;
export const getNotesByFolder = (state: RootState) => {
    let notes: any = {};
    let tempFolders = [...state.datas.folders];
    tempFolders.sort(compareFunction).map((folder) => {
        notes[folder.name] = [];
    });
    notes['4cbaed4f-c3eb-4a2e-b033-c3253cd03c50'] = [];
    state.datas.notes.map((note) => {
        if (note.folder_id) {
            notes[getFolderNameById(state.datas.folders, note.folder_id)].push(note);
            notes[getFolderNameById(state.datas.folders, note.folder_id)].sort(compareFunction);
        } else {
            notes['4cbaed4f-c3eb-4a2e-b033-c3253cd03c50'].push(note);
        }
    });
    return notes;
};

/*
 * Utils
 */

const getFolderNameById = (folders: Array<Folder>, id: string) => {
    let folder = folders.find((element) => element.id === id);
    if (folder) {
        return folder.name;
    } else {
        return '4cbaed4f-c3eb-4a2e-b033-c3253cd03c50';
    }
};

const compareFunction = (a: Note | Folder, b: Note | Folder) => {
    return ('' + a.name).localeCompare(b.name);
};

const getFolderByName = (folders: Array<Folder>, name: string) => {
    return folders.find((element) => element.name === name);
};

export const {
    addFolder,
    removeFolder,
    editFolder,
    addNote,
    removeNote,
    editNote,
    selectFolder,
    selectNote,
    updateAppElement,
    updateStatus,
} = foldersSlice.actions;

export default foldersSlice.reducer;
