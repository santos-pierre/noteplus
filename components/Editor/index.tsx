import { getNotes, getSettings } from '@/redux/selectors';
import { updateActiveNote, updateNote } from '@/redux/slices/dataSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/gfm/gfm';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/php/php';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/neo.css';
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/scroll/scrollpastend';
import { findNote } from '@/utils/notes';
import dayjs from 'dayjs';
import { NoteItem } from '@/types';

const Editor: React.FC = () => {
    const { activeNote, notes } = useSelector(getNotes);
    const { codeMirrorOptions } = useSelector(getSettings);
    const dispatch = useDispatch();

    const [currentNote, setActiveNote] = useState<NoteItem>();

    useEffect(() => {
        if (activeNote) {
            updateActiveNote(activeNote);
            const note = findNote(notes, activeNote);
            setActiveNote(note);
        }
    }, [activeNote]);

    const renderEditor = () => {
        if (activeNote) {
            if (!currentNote) {
                return <div>Empty</div>;
            } else if (currentNote !== undefined) {
                return (
                    <CodeMirror
                        className="h-full pb-10"
                        value={currentNote.content}
                        options={codeMirrorOptions}
                        editorDidMount={(editor) => {
                            setTimeout(() => {
                                editor.focus();
                            }, 0);
                            editor.setCursor(0);
                        }}
                        onChange={(editor, data, value) => {
                            dispatch(
                                updateNote({
                                    id: currentNote.id,
                                    content: value,
                                    folderId: currentNote.folderId,
                                    lastUpdate: dayjs().toString(),
                                    name: currentNote.name,
                                })
                            );
                        }}
                    />
                );
            }
        }
    };

    return <>{renderEditor()}</>;
};

export default Editor;
