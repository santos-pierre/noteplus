import { useEffect, useState } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/gfm/gfm';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/php/php';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/neo.css';
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/scroll/scrollpastend';
import { useDispatch, useSelector } from 'react-redux';
import { editNote, getCurrentNote } from '../../redux/slices/notesSlice';
import { Note } from '../../redux/types/NotesState';

const Editor: React.FC = () => {
    const selectedNote: Note | null = useSelector(getCurrentNote);
    const dispatch = useDispatch();
    const [activeNote, setActiveNote] = useState<Note | undefined>();

    useEffect(() => {
        if (selectedNote) {
            setActiveNote(selectedNote);
        }
        console.log(activeNote);
    }, [selectedNote]);

    const [codeMirrorOptions] = useState<any>({
        mode: 'gfm',
        theme: 'neo',
        lineNumbers: false,
        lineWrapping: true,
        styleActiveLine: { nonEmpty: true },
        viewportMargin: Infinity,
        keyMap: 'default',
        dragDrop: false,
        scrollPastEnd: false,
    });

    const renderEditor = () => {
        if (selectedNote) {
            if (!activeNote) {
                return <div>Empty</div>;
            } else if (activeNote !== undefined) {
                return (
                    <CodeMirror
                        className="h-full pb-10"
                        value={activeNote.content}
                        options={codeMirrorOptions}
                        editorDidMount={(editor) => {
                            setTimeout(() => {
                                editor.focus();
                            }, 0);
                            editor.setCursor(0);
                        }}
                        onBeforeChange={(editor, data, value) => {
                            dispatch(
                                editNote({
                                    id: activeNote.id,
                                    content: value,
                                    folder_name: activeNote.folder_id,
                                    newName: activeNote.name,
                                })
                            );
                        }}
                        onChange={(editor, data, value) => {
                            if (!value) {
                                editor.focus();
                            }
                        }}
                    />
                );
            }
        }
    };

    return <>{renderEditor()}</>;
};

export default Editor;
