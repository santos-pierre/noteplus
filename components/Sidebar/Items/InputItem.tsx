import { FocusEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppElement } from '../../../enum/AppElement';
import { AppStatus } from '../../../enum/AppStatus';
import {
    addNote,
    getCurrentFolder,
    updateAppElement,
    updateStatus,
    getCurrentAppElement,
    addFolder,
    getFolders,
} from '../../../redux/slices/notesSlice';

import { Folder } from '../../../redux/types/NotesState';

type InputItemProps = {
    folder_name?: string;
    content?: string;
};

const InputItem = ({ folder_name, content }: InputItemProps) => {
    const dispatch = useDispatch();
    const currentFolder = useSelector(getCurrentFolder);
    const currentAppElement = useSelector(getCurrentAppElement);
    const folders = useSelector(getFolders);
    const inputEl = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState<string>('');
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (content) {
            setValue(content);
        }
    }, []);

    useEffect(() => {
        return () => {};
    }, []);

    useEffect(() => {
        if (value) {
            if (value.length >= 20) {
                setError('name cannot exceed 20 characters');
            } else if (nameAlreadyExist(folders, value.trim())) {
                setError('Folder Already Exist');
            } else {
                setError('');
            }
        }
    }, [value]);

    const nameAlreadyExist = (tab: Array<Folder>, name: string) => {
        return tab.findIndex((folder) => folder.name === name) !== -1;
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!error) {
            if (currentAppElement === AppElement.NOTE) {
                dispatch(
                    addNote({
                        name: value,
                        folder_id: currentFolder && currentFolder.id,
                    })
                );
            } else if (currentAppElement === AppElement.FOLDER) {
                dispatch(
                    addFolder({
                        name: value,
                    })
                );
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
        if (content) {
            setValue(content);
        } else {
            setValue('');
        }
        dispatch(updateAppElement(AppElement.NONE));
        dispatch(updateStatus(AppStatus.NONE));
    };

    return (
        <div>
            <form
                className={`mt-1 relative inline-block ${
                    folder_name && folder_name !== '4cbaed4f-c3eb-4a2e-b033-c3253cd03c50' ? 'ml-5' : ''
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
                    className={`inline-block p-2 border-gray-300 rounded-lg  dark:bg-gray-600 shadow-sm focus:outline-none focus:ring-1 ${
                        !error ? 'focus:ring-blue-500' : 'focus:ring-red-500'
                    } sm:text-sm`}
                />
                {error && (
                    <p className="absolute left-0 inline-block w-full p-2 text-sm text-red-700 bg-red-200 rounded-md top-10">
                        {error}
                    </p>
                )}
            </form>
        </div>
    );
};

export default InputItem;
