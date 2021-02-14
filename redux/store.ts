import { configureStore } from '@reduxjs/toolkit';
import notesSlice from './slices/notesSlice';
import sidebarSlice from './slices/sidebarSlice';

export default configureStore({
    reducer: {
        sidebar: sidebarSlice,
        datas: notesSlice,
    },
    devTools: true,
});
