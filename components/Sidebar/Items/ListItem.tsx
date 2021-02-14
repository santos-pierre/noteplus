import { Note } from '../../../redux/types/NotesState';
import NoteItem from './NoteItem';

type ListItemProps = {
    notes: Array<Note>;
};
const ListItem = ({ notes }: ListItemProps) => {
    return (
        <ul>
            {notes.map((element: Note) => {
                return <NoteItem key={element.id} note={element} />;
            })}
        </ul>
    );
};

export default ListItem;
