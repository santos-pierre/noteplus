import { useState } from 'react';
import FolderNotes from './FolderNotes';

type ListItemFolderProps = {
    notes: any;
};

const ListItems = ({ notes }: ListItemFolderProps) => {
    const [onDrop, setOnDrop] = useState<string | null>(null);
    return (
        <>
            {Object.keys(notes).map((keyName) => {
                return (
                    <FolderNotes
                        folder_name={keyName}
                        notes={notes[keyName]}
                        key={keyName}
                        dropVisibility={onDrop}
                        handleDropVisibility={setOnDrop}
                    />
                );
            })}
        </>
    );
};

export default ListItems;
