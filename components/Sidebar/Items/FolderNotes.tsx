import { useState } from 'react';
import { Note } from '../../../redux/types/NotesState';
import FolderItem from './FolderItem';
import NoteItem from './NoteItem';

type FolderNotesProps = {
    folder_name: string;
    notes: any;
};

const FolderNotes = ({ folder_name, notes }: FolderNotesProps) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <ul key={`${folder_name}-container`}>
            {folder_name !== 'other' && (
                <>
                    <FolderItem
                        key={folder_name}
                        folder_name={folder_name}
                        handleCollapse={() => setOpen(!open)}
                        collapse={open}
                    />
                    <ul className={`${open ? 'block' : 'hidden'} my-1`}>
                        {notes.map((element: Note) => {
                            return <NoteItem key={element.id} note={element} />;
                        })}
                    </ul>
                </>
            )}
        </ul>
    );
};

export default FolderNotes;
