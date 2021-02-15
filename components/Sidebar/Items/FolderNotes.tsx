import { DragEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { editNote } from '../../../redux/slices/notesSlice';
import { Note } from '../../../redux/types/NotesState';
import FolderItem from './FolderItem';
import NoteItem from './NoteItem';

type FolderNotesProps = {
    folder_name: string;
    notes: any;
    dropVisibility: string | null;
    handleDropVisibility: Function;
};

const FolderNotes = ({ folder_name, notes, dropVisibility, handleDropVisibility }: FolderNotesProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const dispatch = useDispatch();
    useEffect(() => {
        if (folder_name === 'other') {
            setOpen(true);
        }
    }, [folder_name]);

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

    return (
        <figure
            key={`${folder_name}`}
            id={`${folder_name}`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`${
                dropVisibility === folder_name
                    ? 'bg-blue-100 dark:bg-blue-700 border-2 border-blue-900 rounded-md'
                    : ''
            }`}
        >
            {folder_name !== 'other' && (
                <FolderItem
                    key={folder_name}
                    folder_name={folder_name}
                    handleCollapse={() => setOpen(!open)}
                    collapse={open}
                />
            )}
            <ul
                className={`${open ? 'block' : 'hidden'} ${
                    folder_name === 'other' && notes.length === 0 ? 'h-52' : ''
                } my-1 `}
            >
                {notes.map((element: Note) => {
                    return <NoteItem key={element.id} note={element} />;
                })}
            </ul>
        </figure>
    );
};

export default FolderNotes;
