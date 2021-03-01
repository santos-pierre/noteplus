import { AppElement, AppStatus, DEFAULT_FOLDER } from '@/enums';
import { getSettings } from '@/redux/selectors';
import { updateActiveFolder, updateActiveNote } from '@/redux/slices/dataSlice';
import {
    updateAppModeItemType,
    updateAppModeStatus,
    updateUserSelection,
    updateCurrentElementEdited,
} from '@/redux/slices/settingsSlice';
import { NoteItem } from '@/types';
import { Menu, Transition } from '@headlessui/react';
import { DragEvent, useState, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputItem from '@/components/Sidebar/Items/InputItem';

type ItemProps = {
    note: NoteItem;
};

const NoteElement: React.FC<ItemProps> = ({ note }) => {
    const dispatch = useDispatch();
    const { activeUserSelection, appModeStatus, appModeItemType, currentElementInEditionMode } = useSelector(
        getSettings
    );
    const [actionVisibility, setActionVisibility] = useState<boolean>(false);

    const handleMouseEnter = () => {
        setActionVisibility(true);
    };

    const handleMouseLeave = () => {
        setActionVisibility(false);
    };

    const handleClick = (e: MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        dispatch(updateUserSelection(note.id));
        dispatch(updateActiveNote(note.id));
        dispatch(updateActiveFolder(note.folderId));
    };

    const handleDragStart = (e: DragEvent) => {
        e.dataTransfer.setData('note', JSON.stringify(note));
    };

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
    };

    const renderNoteElement = () => {
        if (
            appModeStatus === AppStatus.EDIT &&
            appModeItemType === AppElement.NOTE &&
            currentElementInEditionMode === note.id
        ) {
            return <InputItem note={note} folder_name={note.folderId} />;
        } else {
            return (
                <li
                    className={`${
                        activeUserSelection === note?.id
                            ? 'bg-blue-900 text-blue-300 shadow-md'
                            : 'text-dark-400 hover:bg-dark-900 hover:text-dark-200'
                    }  ${
                        note.folderId !== DEFAULT_FOLDER.NAME && 'ml-5'
                    } group flex items-center justify-between px-2 py-2 lg:text-sm text-base font-medium rounded-md cursor-pointer relative`}
                    onClick={handleClick}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    draggable
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    id={note.id}
                >
                    <svg
                        className={`${
                            activeUserSelection === note?.id ? 'text-blue-400' : 'group-hover:text-dark-200'
                        } mr-4 lg:mr-3 h-5 w-5`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                    <span className="flex-grow select-none">{note?.name}</span>
                    {actionVisibility && (
                        <Menu>
                            {({ open }) => (
                                <>
                                    <Menu.Button
                                        className="items-end rounded-md focus:outline-none"
                                        onClick={(e: MouseEvent<HTMLButtonElement>) => e.stopPropagation()}
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
                                            className="absolute right-0 z-40 w-32 mt-2 origin-top-right border border-gray-800 divide-y divide-gray-600 rounded-md shadow-lg outline-none bg-dark-700"
                                        >
                                            <Menu.Item>
                                                <span
                                                    className={`text-gray-400 flex space-x-4 items-center w-full px-4 py-2 text-xs leading-5 hover:bg-gray-800 hover:text-gray-300 focus:outline-none`}
                                                    onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                                        e.stopPropagation();
                                                        setActionVisibility(false);
                                                        dispatch(updateAppModeStatus(AppStatus.EDIT));
                                                        dispatch(updateAppModeItemType(AppElement.NOTE));
                                                        dispatch(updateCurrentElementEdited(note.id));
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
                                                        dispatch(updateAppModeItemType(AppElement.NOTE));
                                                        dispatch(updateCurrentElementEdited(note.id));
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
                </li>
            );
        }
    };

    return renderNoteElement();
};

export default NoteElement;
