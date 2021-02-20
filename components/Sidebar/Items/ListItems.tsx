// import { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { AppElement } from '../../../enums/AppElement';
// import { AppStatus } from '../../../enums/AppStatus';
// import { getCurrentAppElement, getCurrentAppStatus } from '../../../redux/slices/notesSlice';
// import FolderNotes from './FolderNotes';
// import InputItem from './InputItem';

type ListItemFolderProps = {
    notes: any;
};

const ListItems = () => {
    // const [onDrop, setOnDrop] = useState<string | null>(null);
    // const currentAppElement = useSelector(getCurrentAppElement);
    // const currentAppStatus = useSelector(getCurrentAppStatus);

    // const isVisible = () => {
    //     if (currentAppElement === AppElement.FOLDER) {
    //         return currentAppStatus === AppStatus.CREATE;
    //     } else {
    //         return false;
    //     }
    // };
    return (
        // TODO
        <div>Refactor</div>
        // <>
        //     {isVisible() && (
        //         <div className="px-3">
        //             <InputItem />
        //         </div>
        //     )}
        //     {Object.keys(notes).map((keyName) => {
        //         return (
        //             <FolderNotes
        //                 folder_name={keyName}
        //                 notes={notes[keyName]}
        //                 key={keyName}
        //                 dropVisibility={onDrop}
        //                 handleDropVisibility={setOnDrop}
        //             />
        //         );
        //     })}
        // </>
    );
};

export default ListItems;
