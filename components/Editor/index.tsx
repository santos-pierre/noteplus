import { getNotes, getSettings } from '@/redux/selectors';
import { updateActiveNote, updateNote } from '@/redux/slices/dataSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/gfm/gfm';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/php/php';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material-palenight.css';
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/scroll/scrollpastend';
import { findNote } from '@/utils/notes';
import dayjs from 'dayjs';
import { NoteItem } from '@/types';
import EmptyEditor from '@/components/Editor/EmptyEditor';

import MarkdownPreview from './MarkdownPreview';

const Editor: React.FC = () => {
    const { activeNote, notes } = useSelector(getNotes);
    const { codeMirrorOptions } = useSelector(getSettings);
    const [preview, setPreview] = useState(false);
    const dispatch = useDispatch();

    const [currentNote, setActiveNote] = useState<NoteItem>();

    useEffect(() => {
        if (activeNote !== '') {
            updateActiveNote(activeNote);
            const note = findNote(notes, activeNote);
            setActiveNote(note);
        } else {
            setActiveNote(undefined);
        }
    }, [activeNote]);

    const renderEditor = () => {
        if (!currentNote) {
            return <EmptyEditor />;
        } else if (currentNote !== undefined) {
            if (preview) {
                return (
                    <div className="relative h-full bg-palenight">
                        <MarkdownPreview content={currentNote.content} />
                        <button
                            onClick={() => setPreview(!preview)}
                            className="absolute top-0 right-0 z-40 text-xl text-white w-52"
                        >
                            set Preview
                        </button>
                    </div>
                );
            } else {
                return (
                    <div className="relative h-full">
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
                            onBeforeChange={(editor, data, value) => {
                                dispatch(
                                    updateNote({
                                        id: currentNote.id,
                                        content: value,
                                        folderId: currentNote.folderId,
                                        lastUpdate: dayjs().toString(),
                                        name: currentNote.name,
                                    })
                                );
                                setActiveNote({ ...currentNote, content: value });
                            }}
                            onChange={(editor, data, value) => {
                                if (!value) {
                                    editor.focus();
                                }
                            }}
                            onPaste={(editor, event: any) => {
                                // https://github.com/scniro/react-codemirror2/issues/77
                                if (
                                    !event.clipboardData ||
                                    !event.clipboardData.items ||
                                    !event.clipboardData.items[0]
                                )
                                    return;
                                event.clipboardData.items[0].getAsString((pasted: any) => {
                                    if (editor.getSelection() !== pasted) return;
                                    const { anchor, head } = editor.listSelections()[0];
                                    editor.setCursor({
                                        line: Math.max(anchor.line, head.line),
                                        ch: Math.max(anchor.ch, head.ch),
                                    });
                                });
                            }}
                        />
                        <button
                            onClick={() => setPreview(!preview)}
                            className="absolute top-0 right-0 z-40 text-xl text-white"
                        >
                            set Preview
                        </button>
                    </div>
                );
            }
        }
    };

    return <>{renderEditor()}</>;
};

export default Editor;
