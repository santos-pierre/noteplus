import { Folder, Note } from './NotesState';

export type SideBarState = {
    visibility: boolean;
    userSelection: Note | Folder | null;
};
