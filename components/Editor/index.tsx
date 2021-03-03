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
                return <MarkdownPreview content={currentNote.content} />;
            } else {
                return (
                    <CodeMirror
                        className="h-full"
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
                );
            }
        }
    };

    return (
        <div className="relative h-full bg-palenight">
            {renderEditor()}
            {currentNote && (
                <div
                    className="absolute bottom-0 z-40 flex items-center justify-end w-full h-8 bg-blue-500 text-gray-50"
                    style={{ height: '3%' }}
                >
                    <button
                        className="inline-flex mr-5 hover:bg-opacity-75 focus:outline-none"
                        onClick={() => setPreview(!preview)}
                    >
                        {' '}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6 mr-2"
                        >
                            {!preview ? (
                                <>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                </>
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                            )}
                        </svg>
                        {preview ? 'Edit Mode' : 'Preview Mode'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Editor;
