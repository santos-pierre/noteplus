import { getNotes, getSettings } from '@/redux/selectors';
import { updateActiveFolder } from '@/redux/slices/dataSlice';
import { updateUserSelection } from '@/redux/slices/settingsSlice';
import { getFolderByName } from '@/utils/notes';
import { useDispatch, useSelector } from 'react-redux';

type FolderItemProps = {
    folder_name: string;
    collapse: boolean;
    handleCollapse: Function;
};

const FolderItem: React.FC<FolderItemProps> = ({ folder_name, collapse, handleCollapse }) => {
    const { folders } = useSelector(getNotes);
    const { activeUserSelection } = useSelector(getSettings);
    const folder = getFolderByName(folders, folder_name);

    const dispatch = useDispatch();

    const handelClick = (folderId: string) => {
        dispatch(updateActiveFolder(folderId));
        dispatch(updateUserSelection(folderId));
        handleCollapse(!collapse);
    };

    return (
        <figcaption
            className={`${
                activeUserSelection === folder?.id
                    ? 'bg-blue-900 text-blue-300 shadow-md'
                    : 'text-dark-400 hover:bg-dark-900 hover:text-dark-200'
            }  group flex items-center justify-between p-2 lg:text-sm text-base font-medium rounded-md cursor-pointer`}
            onClick={() => (folder ? handelClick(folder.id) : handelClick(''))}
        >
            <div className="flex items-center">
                {collapse ? (
                    // Open Folder
                    <svg
                        className={`${
                            activeUserSelection === folder?.id ? 'text-blue-400' : 'group-hover:text-dark-200'
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
                            activeUserSelection === folder?.id ? 'text-blue-400' : 'group-hover:text-dark-200'
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
                <span className="flex-grow select-none">{folder_name}</span>
            </div>
        </figcaption>
    );
};

export default FolderItem;
