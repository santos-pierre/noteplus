import { DEFAULT_FOLDER } from '@/enums';
import { FolderItem, NoteItem } from '@/types';

export const findNote = (notes: NoteItem[], note_id: string) => {
    return notes.find((note) => note.id === note_id);
};

export const getFolderNameById = (folders: FolderItem[], id: string) => {
    let folder = folders.find((element) => element.id === id);
    if (folder) {
        return folder.name;
    } else {
        return DEFAULT_FOLDER.NAME;
    }
};

export const getFolderById = (folders: FolderItem[], id: string) => {
    let folder = folders.find((element) => element.id === id);
    if (folder) {
        return folder;
    } else {
        return { id: DEFAULT_FOLDER.NAME, name: DEFAULT_FOLDER.NAME } as FolderItem;
    }
};

export const compareFunction = (a: NoteItem | FolderItem, b: NoteItem | FolderItem) => {
    if (a.name === DEFAULT_FOLDER.NAME || b.name === DEFAULT_FOLDER.NAME) {
        return -1;
    }
    return ('' + a.name).localeCompare(b.name);
};

export const getFolderByName = (folders: FolderItem[], name: string) => {
    let folder = folders.find((element) => element.name === name);
    if (folder) {
        return folder;
    } else {
        return { id: DEFAULT_FOLDER.NAME, name: DEFAULT_FOLDER.NAME } as FolderItem;
    }
};
