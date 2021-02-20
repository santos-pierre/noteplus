import { configureStore } from '@reduxjs/toolkit';
import dataSlice from '@/redux/slices/dataSlice';
import settingsSlice from '@/redux/slices/settingsSlice';

export default configureStore({
    reducer: {
        settings: settingsSlice,
        datas: dataSlice,
    },
    devTools: true,
});
