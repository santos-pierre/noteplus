export type NotesState = {
    folders: Array<Folder>;
    notes: Array<Note>;
    currentFolder: Folder | null;
    currentNote: Note | null;
    appStatus: string;
    appElementType: string;
};

// Folder
export type Folder = {
    id: string;
    name: string;
};

export type newFolder = {
    name: string;
};

export type EditFolderAction = {
    id: string;
    newName: string;
};

// Note
export type Note = {
    id: string;
    name: string;
    folder_id: string | null;
    content: string | undefined;
};

export type newNote = {
    name: string;
    folder_id: string | null;
};

export type EditNoteAction = {
    id: string;
    newName: string;
    folder_name: string | null;
    content: string | undefined;
};
