import dayjs from 'dayjs';
import { v4 as uuid } from 'uuid';
import { AppElement, AppStatus, DEFAULT_FOLDER } from '@/enums';
import { getNotes, getSettings } from '@/redux/selectors';
import { addFolder, addNote, updateActiveNote, updateFolder, updateNote } from '@/redux/slices/dataSlice';
import { FolderItem, NoteItem } from '@/types';
import { FocusEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    updateAppModeItemType,
    updateAppModeStatus,
    updateCurrentElementEdited,
    updateUserSelection,
} from '@/redux/slices/settingsSlice';

type InputItemProps = {
    folder_name?: string;
    note?: NoteItem;
    folder?: FolderItem;
};

const InputItem: React.FC<InputItemProps> = ({ folder_name, note, folder }) => {
    const dispatch = useDispatch();
    const { activeFolder, folders, notes } = useSelector(getNotes);
    const { appModeItemType, appModeStatus } = useSelector(getSettings);
    const inputEl = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState<string>('');
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (folder && folder.name) {
            setValue(folder.name);
        }
        if (note && note.name) {
            setValue(note.name);
        }
    }, []);

    useEffect(() => {
        return () => {};
    }, []);

    useEffect(() => {
        if (value) {
            if (value.length >= 20) {
                setError('Name cannot exceed 20 characters');
            } else if (
                (nameAlreadyExist(folders, value.trim()) || nameAlreadyExist(notes, value.trim())) &&
                (note?.name !== value.trim() || folder?.name !== value.trim())
            ) {
                setError('Folder or note with the same name already exist');
            } else {
                setError('');
            }
        }
    }, [value]);

    //==============================================
    // Validation
    //==============================================

    const nameAlreadyExist = (tab: FolderItem[] | NoteItem[], name: string) => {
        return tab.findIndex((element) => element.name === name) !== -1;
    };

    //==============================================
    // React Events Handler
    //==============================================

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!error) {
            if (appModeItemType === AppElement.NOTE) {
                handleNote();
            } else if (appModeItemType === AppElement.FOLDER) {
                handleFolder();
            }
            if (inputEl.current) {
                inputEl.current.blur();
            }
        }
    };

    const handleChange = (e: FocusEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handleOnBlur = () => {
        if (note?.name) {
            setValue(note.name);
        } else {
            setValue('');
        }
        dispatch(updateAppModeItemType(AppElement.NONE));
        dispatch(updateAppModeStatus(AppStatus.VIEW));
        dispatch(updateCurrentElementEdited(''));
    };

    const handleFolder = () => {
        if (appModeStatus === AppStatus.EDIT) {
            if (folder) {
                dispatch(
                    updateFolder({
                        ...folder,
                        name: value,
                    })
                );
            }
        } else {
            dispatch(
                addFolder({
                    id: uuid(),
                    name: value,
                })
            );
        }
    };

    //==============================================
    // Utils
    //==============================================

    const handleNote = () => {
        if (appModeStatus === AppStatus.EDIT) {
            if (note) {
                dispatch(
                    updateNote({
                        ...note,
                        lastUpdate: dayjs().toString(),
                        name: value,
                    })
                );
            }
        } else {
            let newNoteId = uuid();
            dispatch(
                addNote({
                    id: newNoteId,
                    name: value,
                    folderId: activeFolder,
                    content: '',
                    lastUpdated: dayjs().toString(),
                })
            );
            dispatch(updateActiveNote(newNoteId));
            dispatch(updateUserSelection(newNoteId));
        }
    };

    return (
        <div>
            <form
                className={`mt-1 relative inline-block ${
                    folder_name && folder_name !== DEFAULT_FOLDER.NAME ? 'ml-5' : ''
                } rounded-md`}
                onSubmit={handleSubmit}
            >
                <input
                    ref={inputEl}
                    autoFocus
                    type="text"
                    value={value}
                    onChange={handleChange}
                    onBlur={handleOnBlur}
                    className={`w-full inline-block p-2 border-gray-300 rounded-lg bg-gray-600 shadow-sm focus:outline-none focus:ring-1 ${
                        !error ? 'focus:ring-blue-500' : 'focus:ring-red-500'
                    } sm:text-sm`}
                />
                {error && (
                    <p className="absolute left-0 inline-block w-full p-2 text-sm text-red-700 bg-red-200 rounded-md top-10 z-10">
                        {error}
                    </p>
                )}
            </form>
        </div>
    );
};

export default InputItem;
