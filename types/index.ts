//==============================================
//Items
//==============================================

export type NoteItem = {
    id: string;
    name: string;
    content: string;
    lastUpdated: string;
    folderId: string;
};

export type FolderItem = {
    id: string;
    name: string;
};

//==============================================
//Redux States
//==============================================

export type SettingsState = {
    sidebarVisible: boolean;
    activeUserSelection: string;
    currentElementInEditionMode: string;
    appModeStatus: string; // Current Mode App => View/Edit/Create
    appModeItemType: string; // What are we Create/Edit => Folder or Note
    codeMirrorOptions: { [key: string]: any };
};

export type NoteState = {
    folders: FolderItem[];
    notes: NoteItem[];
    activeFolder: string;
    activeNote: string;
    error: string;
    loading?: boolean;
};

export type RootState = {
    datas: NoteState;
    settings: SettingsState;
};

//==============================================
//Redux Payload
//==============================================

export type AddItemPayload = {
    name: string;
    folderId?: string;
};

export type EditFolderPaylaod = {
    id: string;
    name: string;
};

export type EditNotePayload = {
    id: string;
    name: string;
    lastUpdate: string;
    folderId: string;
    content: string;
};

export type EditItemPayload = EditFolderPaylaod & EditNotePayload;

//==============================================
//Events
//==============================================

export type ReactDragEent = React.DragEvent<HTMLElement>;

//==============================================
//Default Types
//==============================================

export type WithPayload<P, T> = T & {
    payload: P;
};
