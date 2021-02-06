import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVisibility, toggle } from '../redux/slices/sidebarSlice';

export const useSidebar = () => {
    const isVisible = useSelector(getVisibility);
    const dispatch = useDispatch();

    const toggleVisibility = useCallback(() => {
        dispatch(toggle());
    }, [dispatch]);

    return { isVisible, toggleVisibility };
};
