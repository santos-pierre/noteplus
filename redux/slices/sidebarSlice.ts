import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../types/RootState';
import { SideBarState } from '../types/SidebarState';

const initialState: SideBarState = { visibility: false };

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        toggle: (state) => {
            state.visibility = !state.visibility;
        },
    },
});

export const getVisibility = (state: RootState) => state.sidebar.visibility;

export const { toggle } = sidebarSlice.actions;

export default sidebarSlice.reducer;
