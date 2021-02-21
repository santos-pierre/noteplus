import { DEFAULT_FOLDER } from '@/enums';
import { getSettings } from '@/redux/selectors';
import { updateActiveFolder } from '@/redux/slices/dataSlice';
import { toggle, updateUserSelection } from '@/redux/slices/settingsSlice';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useSidebar = () => {
    const { sidebarVisible } = useSelector(getSettings);
    const dispatch = useDispatch();

    const toggleVisibility = useCallback(() => {
        dispatch(toggle());
    }, [dispatch]);

    return { sidebarVisible, toggleVisibility };
};

export const useResetUserSelection = () => {
    const dispatch = useDispatch();

    const resetUserSelection = useCallback(() => {
        dispatch(updateActiveFolder(DEFAULT_FOLDER.NAME));
        dispatch(updateUserSelection(''));
    }, [dispatch]);

    return { resetUserSelection };
};
