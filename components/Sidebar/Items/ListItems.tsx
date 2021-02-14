import FolderNotes from './FolderNotes';

type ListItemFolderProps = {
    notes: any;
};

const ListItems = ({ notes }: ListItemFolderProps) => {
    return (
        <>
            {Object.keys(notes).map((keyName) => {
                return <FolderNotes folder_name={keyName} notes={notes[keyName]} key={keyName} />;
            })}
        </>
    );
};

export default ListItems;
