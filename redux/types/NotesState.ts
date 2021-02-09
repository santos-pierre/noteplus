export type NotesState = {
    folders: Array<Folder>;
    files: Array<File>;
    currentFolder: string | null;
    currentNote: string | null;
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

// File

export type File = {
    id: string;
    name: string;
    folder_id: string | null;
    content: string | null;
};

export type newFile = {
    name: string;
    folder_id: string | null;
};

export type EditFileAction = {
    id: string;
    newName: string;
    folder_id: string | null;
};
