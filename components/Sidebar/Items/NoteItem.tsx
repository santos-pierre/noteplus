import { useDispatch, useSelector } from 'react-redux';
import { Note } from '../../../redux/types/NotesState';
import { selectFolder, selectNote } from '../../../redux/slices/notesSlice';
import { getUserSelection, selectItemSidebar } from '../../../redux/slices/sidebarSlice';
import { DragEvent } from 'react';

type ItemProps = {
    note: Note;
};

const NoteItem = ({ note }: ItemProps) => {
    const dispatch = useDispatch();
    const userSelection = useSelector(getUserSelection);

    const handleClick = () => {
        dispatch(selectItemSidebar(note));
        dispatch(selectNote(note));
        dispatch(selectFolder(note.folder_id));
    };

    const handleDragStart = (e: DragEvent<HTMLElement>) => {
        e.dataTransfer.setData('note', JSON.stringify(note));
    };

    const handleDragOver = (e: DragEvent<HTMLElement>) => {
        e.preventDefault();
    };

    return (
        <li
            className={`${
                userSelection?.id === note?.id
                    ? 'bg-blue-500 text-blue-100 dark:bg-blue-900 dark:text-blue-300 shadow-md'
                    : 'text-dark-600 dark:text-dark-400 hover:bg-dark-50 dark:hover:bg-dark-900 hover:text-dark-900 dark:hover:text-dark-200'
            }  ${
                note.folder_id ? 'ml-5' : ''
            } group flex items-center justify-between px-2 py-2 lg:text-sm text-base font-medium rounded-md cursor-pointer`}
            onClick={handleClick}
            draggable
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            id={note.id}
        >
            <svg
                className={`${
                    userSelection?.id === note?.id
                        ? 'text-blue-300 dark:text-blue-400'
                        : '  group-hover:text-dark-500 dark:group-hover:text-dark-200'
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
            <span className="flex-grow">{note?.name}</span>
        </li>
    );
};

export default NoteItem;
