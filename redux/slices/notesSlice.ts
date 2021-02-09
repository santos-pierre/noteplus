import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    EditFolderAction,
    newFile,
    Folder,
    newFolder,
    NotesState,
    File,
    EditFileAction,
} from '../types/NotesState';
import { RootState } from '../types/RootState';
import { v4 as uuidv4 } from 'uuid';

const initialState: NotesState = {
    folders: [],
    files: [],
    currentFolder: null,
    currentNote: null,
};

const foldersSlice = createSlice({
    name: 'notes',
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
        // Files
        addFile: (state, action: PayloadAction<newFile>) => {
            if (action.payload.name.trim()) {
                let newFile: File = {
                    id: uuidv4(),
                    name: action.payload.name,
                    folder_id: action.payload.folder_id,
                    content: null,
                };
                state.files.push(newFile);
            }
        },
        removeFile: (state, action: PayloadAction<string>) => {
            state.files.filter((file) => {
                return file.id !== action.payload;
            });
        },
        editFile: (state, action: PayloadAction<EditFileAction>) => {
            let indexFile = state.files.findIndex((folder) => {
                return folder.id === action.payload.id;
            });
            if (indexFile) {
                state.files[indexFile].name = action.payload.newName;
                if (action.payload.folder_id) {
                    state.files[indexFile].folder_id = action.payload.folder_id;
                }
            }
        },
    },
});

/*
 *Selectors
 */

export const getFolders = (state: RootState) => state.notes.folders;
export const getFiles = (state: RootState) => state.notes.files;
export const getCurrentFile = (state: RootState) => state.notes.currentNote;
export const getCurrentFolder = (state: RootState) => state.notes.currentFolder;

export const {
    addFolder,
    removeFolder,
    editFolder,
    addFile,
    removeFile,
    editFile,
} = foldersSlice.actions;

export default foldersSlice.reducer;
