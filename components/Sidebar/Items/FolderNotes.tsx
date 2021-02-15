import { DragEvent, useEffect, useState } from 'react';
import { Note } from '../../../redux/types/NotesState';
import FolderItem from './FolderItem';
import NoteItem from './NoteItem';

type FolderNotesProps = {
    folder_name: string;
    notes: any;
};

const FolderNotes = ({ folder_name, notes }: FolderNotesProps) => {
    const [open, setOpen] = useState<boolean>(false);
    useEffect(() => {
        if (folder_name === 'other') {
            setOpen(true);
        }
    }, [folder_name]);

    const handleDrop = (e: DragEvent<HTMLElement>) => {
        e.preventDefault();

        const note_id = e.dataTransfer.getData('note_id');

        const note = document.getElementById(note_id);

        console.log(note);
    };

    const handleDragOver = (e: DragEvent<HTMLElement>) => {
        e.preventDefault();
    };

    return (
        <figure key={`${folder_name}`} id={`${folder_name}`} onDragOver={handleDragOver} onDrop={handleDrop}>
            {folder_name !== 'other' && (
                <FolderItem
                    key={folder_name}
                    folder_name={folder_name}
                    handleCollapse={() => setOpen(!open)}
                    collapse={open}
                />
            )}
            <ul className={`${open ? 'block' : 'hidden'} my-1`}>
                {notes.map((element: Note) => {
                    return <NoteItem key={element.id} note={element} />;
                })}
            </ul>
        </figure>
    );
};

export default FolderNotes;
