import { useDispatch, useSelector } from 'react-redux';
import { getFolders, selectFolder } from '../../../redux/slices/notesSlice';
import { getUserSelection, selectItemSidebar } from '../../../redux/slices/sidebarSlice';
import { Folder } from '../../../redux/types/NotesState';

type FolderItemProps = {
    folder_name: string;
    collapse: boolean;
    handleCollapse: Function;
};

const FolderItem = ({ folder_name, handleCollapse, collapse }: FolderItemProps) => {
    const folder = useSelector(getFolders).find((element) => element.name === folder_name);
    const userSelection = useSelector(getUserSelection);

    const dispatch = useDispatch();

    const handelClick = (folder: Folder) => {
        dispatch(selectFolder(folder));
        dispatch(selectItemSidebar(folder));
        handleCollapse();
    };

    return (
        <figcaption
            className={`${
                userSelection?.id === folder?.id
                    ? 'bg-blue-500 text-blue-100 dark:bg-blue-900 dark:text-blue-300 shadow-md'
                    : 'text-dark-600 dark:text-dark-400 hover:bg-dark-50 dark:hover:bg-dark-900 hover:text-dark-900 dark:hover:text-dark-200'
            }  group flex items-center justify-between px-2 py-2 lg:text-sm text-base font-medium rounded-md cursor-pointer`}
            onClick={() => (folder ? handelClick(folder) : null)}
        >
            <div className="flex items-center">
                {collapse ? (
                    // Open Folder
                    <svg
                        className={`${
                            userSelection?.id === folder?.id
                                ? 'text-blue-300 dark:text-blue-400'
                                : 'group-hover:text-dark-500 dark:group-hover:text-dark-200'
                        } mr-4 lg:mr-3 h-6 w-6`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
                        />
                    </svg>
                ) : (
                    // Close Folder
                    <svg
                        className={`${
                            userSelection?.id === folder?.id
                                ? 'text-blue-300 dark:text-blue-400'
                                : 'group-hover:text-dark-500 dark:group-hover:text-dark-200'
                        } mr-4 lg:mr-3 h-6 w-6`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                        />
                    </svg>
                )}

                {/* Name */}
                <span className="flex-grow">{folder_name}</span>
            </div>
        </figcaption>
    );
};

export default FolderItem;
