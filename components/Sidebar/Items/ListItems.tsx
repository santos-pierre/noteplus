import { AppElement, AppStatus } from '@/enums';
import { getSettings } from '@/redux/selectors';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import FolderNotes from '@/components/Sidebar/Items/FolderNotes';
import InputItem from '@/components/Sidebar/Items/InputItem';

type ListItemsProps = {
    notes: any;
};

const ListItems = ({ notes }: ListItemsProps) => {
    const [onDrop, setOnDrop] = useState<string | null>(null);
    const { appModeItemType, appModeStatus } = useSelector(getSettings);

    const isVisible = () => {
        if (appModeItemType === AppElement.FOLDER) {
            return appModeStatus === AppStatus.CREATE;
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
