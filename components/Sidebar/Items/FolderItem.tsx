import { AppElement, AppStatus } from '@/enums';
import { getNotes, getSettings } from '@/redux/selectors';
import { updateActiveFolder } from '@/redux/slices/dataSlice';
import {
    updateAppModeItemType,
    updateAppModeStatus,
    updateCurrentElementEdited,
    updateUserSelection,
} from '@/redux/slices/settingsSlice';
import { getFolderByName } from '@/utils/notes';
import { Menu, Transition } from '@headlessui/react';
import { MouseEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputItem from '@/components/Sidebar/Items/InputItem';

type FolderItemProps = {
    folder_name: string;
    collapse: boolean;
    handleCollapse: Function;
};

const FolderItem: React.FC<FolderItemProps> = ({ folder_name, collapse, handleCollapse }) => {
    const { folders } = useSelector(getNotes);
    const { activeUserSelection, appModeStatus, appModeItemType, currentElementInEditionMode } = useSelector(
        getSettings
    );
    const folder = getFolderByName(folders, folder_name);

    const dispatch = useDispatch();

    const [actionVisibility, setActionVisibility] = useState<boolean>(false);

    const handleMouseEnter = () => {
        setActionVisibility(true);
    };

    const handleMouseLeave = () => {
        setActionVisibility(false);
    };

    const handelClick = (folderId: string) => {
        dispatch(updateActiveFolder(folderId));
        dispatch(updateUserSelection(folderId));
        handleCollapse(!collapse);
    };

    const renderFolderItem = () => {
        if (
            appModeStatus === AppStatus.EDIT &&
            appModeItemType === AppElement.FOLDER &&
            currentElementInEditionMode === folder.id
        ) {
            return <InputItem folder={folder} />;
        } else {
            return (
                <figcaption
                    className={`${
                        activeUserSelection === folder?.id
                            ? 'bg-blue-900 text-blue-300 shadow-md'
                            : 'text-dark-400 hover:bg-dark-900 hover:text-dark-200'
                    }  group flex items-center justify-between p-2 lg:text-sm text-base font-medium rounded-md cursor-pointer relative`}
                    onClick={() => (folder ? handelClick(folder.id) : handelClick(''))}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="flex items-center w-full">
                        {collapse ? (
                            // Open Folder
                            <svg
                                className={`${
                                    activeUserSelection === folder?.id
                                        ? 'text-blue-400'
                                        : 'group-hover:text-dark-200'
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
                                    activeUserSelection === folder?.id
                                        ? 'text-blue-400'
                                        : 'group-hover:text-dark-200'
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
                        {actionVisibility && (
                            <Menu>
                                {({ open }) => (
                                    <>
                                        <Menu.Button
                                            className="items-end rounded-md focus:outline-none"
                                            onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                                e.stopPropagation();
                                            }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                className="w-5 h-5 text-blue-500"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                                                />
                                            </svg>
                                        </Menu.Button>
                                        <Transition
                                            show={open}
                                            enter="transition ease-out duration-100"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <Menu.Items
                                                static
                                                className="absolute right-0 w-32 mt-2 origin-top-right border divide-y divide-gray-600 rounded-md shadow-lg outline-none border-gray-800 bg-dark-700 z-10"
                                            >
                                                <Menu.Item>
                                                    <span
                                                        className={`text-gray-400 flex space-x-4 items-center w-full px-4 py-2 text-xs leading-5 hover:bg-gray-800 hover:text-gray-300 focus:outline-none`}
                                                        onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                                            e.stopPropagation();
                                                            setActionVisibility(false);
                                                            dispatch(updateAppModeStatus(AppStatus.EDIT));
                                                            dispatch(
                                                                updateAppModeItemType(AppElement.FOLDER)
                                                            );
                                                            dispatch(updateCurrentElementEdited(folder.id));
                                                        }}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                            className="w-4 h-4"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                                            />
                                                        </svg>
                                                        <span>Edit</span>
                                                    </span>
                                                </Menu.Item>
                                                <Menu.Item>
                                                    <span
                                                        className={`text-gray-400 flex space-x-4 items-center w-full px-4 py-2 text-xs leading-5 hover:bg-gray-800 hover:text-gray-300 focus:outline-none`}
                                                        onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                                            e.stopPropagation();
                                                            setActionVisibility(false);
                                                            dispatch(updateAppModeStatus(AppStatus.DELETE));
                                                            dispatch(
                                                                updateAppModeItemType(AppElement.FOLDER)
                                                            );
                                                            dispatch(updateCurrentElementEdited(folder.id));
                                                        }}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                            className="w-4 h-4"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                            />
                                                        </svg>
                                                        <span>Delete</span>
                                                    </span>
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </>
                                )}
                            </Menu>
                        )}
                    </div>
                </figcaption>
            );
        }
    };

    return renderFolderItem();
};

export default FolderItem;
