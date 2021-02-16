import { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppElement } from '../../../enum/AppElement';
import { AppStatus } from '../../../enum/AppStatus';
import { getCurrentAppElement, getCurrentAppStatus } from '../../../redux/slices/notesSlice';
import FolderNotes from './FolderNotes';
import InputItem from './InputItem';

type ListItemFolderProps = {
    notes: any;
};

const ListItems = ({ notes }: ListItemFolderProps) => {
    const [onDrop, setOnDrop] = useState<string | null>(null);
    const currentAppElement = useSelector(getCurrentAppElement);
    const currentAppStatus = useSelector(getCurrentAppStatus);

    const isVisible = () => {
        if (currentAppElement === AppElement.FOLDER) {
            return currentAppStatus === AppStatus.CREATE;
        } else {
            return false;
        }
    };
    return (
        <>
            {isVisible() && (
                <div className="px-3">
                    <InputItem />
                </div>
            )}
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
