import { SettingsState } from '@/types';
import { AppElement, AppStatus, CODEMIRROR_OPTION } from '@/enums';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const INITIAL_STATE: SettingsState = {
    activeUserSelection: '',
    appModeItemType: AppElement.NONE,
    appModeStatus: AppStatus.VIEW,
    sidebarVisible: false,
    codeMirrorOptions: CODEMIRROR_OPTION,
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState: INITIAL_STATE,
    reducers: {
        toggle: (state) => {
            state.sidebarVisible = !state.sidebarVisible;
        },
        updateUserSelection: (state, { payload }: PayloadAction<string>) => {
            state.activeUserSelection = payload;
        },
        updateAppModeItemType: (state, { payload }: PayloadAction<string>) => {
            state.appModeItemType = payload;
        },
        updateAppModeStatus: (state, { payload }: PayloadAction<string>) => {
            state.appModeStatus = payload;
        },
    },
});

export const {
    toggle,
    updateAppModeItemType,
    updateAppModeStatus,
    updateUserSelection,
} = settingsSlice.actions;

export default settingsSlice.reducer;
