import { AppElement, AppStatus, DEFAULT_FOLDER } from '@/enums';
import { getNotes, getSettings } from '@/redux/selectors';
import { updateNote } from '@/redux/slices/dataSlice';
import { NoteItem as NoteType } from '@/types';
import { getFolderById, getFolderByName } from '@/utils/notes';
import { DragEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FolderItem from '@/components/Sidebar/Items/FolderItem';
import NoteElement from '@/components/Sidebar/Items/NoteElement';
import { useResetUserSelection } from '@/utils/custom-hooks';
import InputItem from '@/components/Sidebar/Items/InputItem';

type FolderNotesProps = {
    folder_name: string;
    notes: any;
    dropVisibility: string | null;
    handleDropVisibility: Function;
};

const FolderNotes: React.FC<FolderNotesProps> = ({
    folder_name,
    notes,
    dropVisibility,
    handleDropVisibility,
}) => {
    const { resetUserSelection } = useResetUserSelection();
    const { activeFolder, folders } = useSelector(getNotes);
    const { appModeStatus, appModeItemType } = useSelector(getSettings);
    const dispatch = useDispatch();
    const [open, setOpen] = useState<boolean>(false);

    const currentFolder = getFolderById(folders, activeFolder);

    useEffect(() => {
        // No Folder Files
        if (folder_name === DEFAULT_FOLDER.NAME) {
            setOpen(true);
        }
    }, [folder_name]);

    const handleDrop = (e: DragEvent) => {
        e.preventDefault();
        const note: NoteType = JSON.parse(e.dataTransfer.getData('note'));
        dispatch(
            updateNote({
                id: note.id,
                folderId: getFolderByName(folders, folder_name).id,
                name: note.name,
                content: note.content,
                lastUpdate: note.lastUpdated,
            })
        );
        handleDropVisibility(null);
    };

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
    };

    const handleDragEnter = (e: DragEvent) => {
        e.preventDefault();
        setOpen(true);
        handleDropVisibility(folder_name);
    };

    const isVisible = () => {
        if (appModeItemType === AppElement.NOTE) {
            if (currentFolder) {
                return currentFolder.name === folder_name && appModeStatus === AppStatus.CREATE;
            } else {
                return folder_name === DEFAULT_FOLDER.NAME && appModeStatus === AppStatus.CREATE;
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
                dropVisibility === folder_name ? 'bg-blue-700 border-2 border-blue-900 rounded-md' : ''
            }px-2`}
        >
            {folder_name !== DEFAULT_FOLDER.NAME && (
                <FolderItem
                    key={folder_name}
                    folder_name={folder_name}
                    handleCollapse={setOpen}
                    collapse={open}
                />
            )}
            <ul
                className={`${open ? 'block' : 'hidden'} ${
                    folder_name === DEFAULT_FOLDER.NAME && notes.length === 0 ? 'h-52' : ''
                } my-1 `}
                onClick={() =>
                    folder_name === DEFAULT_FOLDER.NAME && notes.length === 0 ? resetUserSelection() : ''
                }
            >
                {notes.map((note: NoteType) => {
                    return <NoteElement key={note.id} note={note} />;
                })}
            </ul>
            {isVisible() && <InputItem folder_name={folder_name} />}
        </figure>
    );
};

export default FolderNotes;
