import { getSettings } from '@/redux/selectors';
import { toggle } from '@/redux/slices/settingsSlice';
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
