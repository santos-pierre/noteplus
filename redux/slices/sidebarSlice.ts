import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Folder, Note } from '../types/NotesState';
import { RootState } from '../types/RootState';
import { SideBarState } from '../types/SidebarState';

const initialState: SideBarState = { visibility: false, userSelection: null };

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        toggle: (state) => {
            state.visibility = !state.visibility;
        },
        selectItemSidebar: (state, action: PayloadAction<Folder | Note | null>) => {
            state.userSelection = action.payload;
        },
    },
});

export const getVisibility = (state: RootState) => state.sidebar.visibility;
export const getUserSelection = (state: RootState) => state.sidebar.userSelection;

export const { toggle, selectItemSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
