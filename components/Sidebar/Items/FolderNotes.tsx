import { DragEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppElement } from '../../../enum/AppElement';
import { AppStatus } from '../../../enum/AppStatus';
import {
    editNote,
    getCurrentAppElement,
    getCurrentAppStatus,
    getCurrentFolder,
} from '../../../redux/slices/notesSlice';
import { Note } from '../../../redux/types/NotesState';
import FolderItem from './FolderItem';
import InputItem from './InputItem';
import NoteItem from './NoteItem';

type FolderNotesProps = {
    folder_name: string;
    notes: any;
    dropVisibility: string | null;
    handleDropVisibility: Function;
};

const FolderNotes = ({ folder_name, notes, dropVisibility, handleDropVisibility }: FolderNotesProps) => {
    const currentFolder = useSelector(getCurrentFolder);
    const currentAppStatus = useSelector(getCurrentAppStatus);
    const currentAppElement = useSelector(getCurrentAppElement);
    const dispatch = useDispatch();
    useEffect(() => {
        if (folder_name === '4cbaed4f-c3eb-4a2e-b033-c3253cd03c50') {
            setOpen(true);
        }
    }, [folder_name]);

    const [open, setOpen] = useState<boolean>(false);

    const handleDrop = (e: DragEvent<HTMLElement>) => {
        e.preventDefault();
        const note = JSON.parse(e.dataTransfer.getData('note'));
        dispatch(editNote({ id: note.id, folder_name: folder_name, newName: note.name }));
        handleDropVisibility(null);
    };

    const handleDragOver = (e: DragEvent<HTMLElement>) => {
        e.preventDefault();
    };

    const handleDragEnter = (e: DragEvent<HTMLElement>) => {
        e.preventDefault();
        setOpen(true);
        handleDropVisibility(folder_name);
    };

    const isVisible = () => {
        if (currentAppElement === AppElement.NOTE) {
            if (currentFolder) {
                return currentFolder.name === folder_name && currentAppStatus === AppStatus.CREATE;
            } else {
                return (
                    folder_name === '4cbaed4f-c3eb-4a2e-b033-c3253cd03c50' &&
                    currentAppStatus === AppStatus.CREATE
                );
            }
        } else {
            return false;
        }
    };

    return (
        <figure
            key={`${folder_name}`}
            id={`${folder_name}`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`${
                dropVisibility === folder_name
                    ? 'bg-blue-100 dark:bg-blue-700 border-2 dark:border-blue-900 border-blue-500 rounded-md'
                    : ''
            } px-2`}
        >
            {folder_name !== '4cbaed4f-c3eb-4a2e-b033-c3253cd03c50' && (
                <FolderItem
                    key={folder_name}
                    folder_name={folder_name}
                    handleCollapse={() => setOpen(!open)}
                    collapse={open}
                />
            )}
            <ul
                className={`${open ? 'block' : 'hidden'} ${
                    folder_name === '4cbaed4f-c3eb-4a2e-b033-c3253cd03c50' && notes.length === 0 ? 'h-52' : ''
                } my-1 `}
            >
                {notes.map((element: Note) => {
                    return <NoteItem key={element.id} note={element} />;
                })}
            </ul>
            {isVisible() && <InputItem folder_name={folder_name} />}
        </figure>
    );
};

export default FolderNotes;
