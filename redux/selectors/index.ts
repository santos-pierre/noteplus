import { DEFAULT_FOLDER } from '@/enums';
import { RootState } from '@/types';
import { compareFunction, getFolderNameById } from '@/utils/notes';

export const getNotes = (state: RootState) => state.datas;

export const getNotesByFolder = (state: RootState) => {
    let notes: any = {};
    let tempFolders = [...state.datas.folders];
    tempFolders.sort(compareFunction).map((folder) => {
        notes[folder.name] = [];
    });
    notes[DEFAULT_FOLDER.NAME] = [];
    state.datas.notes.map((note) => {
        if (note.folderId !== DEFAULT_FOLDER.NAME) {
            notes[getFolderNameById(state.datas.folders, note.folderId)].push(note);
            notes[getFolderNameById(state.datas.folders, note.folderId)].sort(compareFunction);
        } else {
            notes[DEFAULT_FOLDER.NAME].push(note);
        }
    });
    return notes;
};

export const getSettings = (state: RootState) => state.settings;
