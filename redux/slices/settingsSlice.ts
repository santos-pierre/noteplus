import { SettingsState } from '@/types';
import { AppElement, AppStatus, CODEMIRROR_OPTION } from '@/enums';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const INITIAL_STATE: SettingsState = {
    activeUserSelection: '',
    appModeItemType: AppElement.NONE,
    appModeStatus: AppStatus.VIEW,
    currentElementInEditionMode: '',
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
        updateCurrentElementEdited: (state, { payload }: PayloadAction<string>) => {
            state.currentElementInEditionMode = payload;
        },
    },
});

export const {
    toggle,
    updateAppModeItemType,
    updateAppModeStatus,
    updateUserSelection,
    updateCurrentElementEdited,
} = settingsSlice.actions;

export default settingsSlice.reducer;
