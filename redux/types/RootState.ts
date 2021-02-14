import { NotesState } from './NotesState';
import { SideBarState } from './SidebarState';

export type RootState = {
    sidebar: SideBarState;
    datas: NotesState;
};
