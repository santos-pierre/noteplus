import { AppElement, AppStatus } from '@/enums';
import { updateAppModeItemType, updateAppModeStatus } from '@/redux/slices/settingsSlice';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

const AddSection = () => {
    const dispatch = useDispatch();

    const handleAddFolder = useCallback(() => {
        dispatch(updateAppModeStatus(AppStatus.CREATE));
        dispatch(updateAppModeItemType(AppElement.FOLDER));
    }, [dispatch]);

    const handleAddNote = useCallback(() => {
        dispatch(updateAppModeStatus(AppStatus.CREATE));
        dispatch(updateAppModeItemType(AppElement.NOTE));
    }, [dispatch]);

    return (
        <div className="py-3 space-y-4 border-t border-b border-dark-500">
            <div className="px-4 font-bold focus:outline-none ">
                <button
                    className="inline-flex font-medium rounded-md focus:outline-none hover:opacity-75"
                    onClick={handleAddNote}
                >
                    <svg
                        className="w-6 h-6 mr-2 text-blue-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                    Add Note
                </button>
            </div>
            <div className="px-4 font-bold focus:outline-none ">
                <button
                    onClick={handleAddFolder}
                    className="inline-flex font-medium rounded-md focus:outline-none hover:opacity-75"
                >
                    <svg
                        className="w-6 h-6 mr-2 text-blue-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                        />
                    </svg>
                    Add Folder
                </button>
            </div>
        </div>
    );
};

export default AddSection;
