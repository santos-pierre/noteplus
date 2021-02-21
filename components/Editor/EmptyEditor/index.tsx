const EmptyEditor: React.FC = () => {
    return (
        <div className="h-full flex justify-center items-center flex-col bg-palenight">
            <h2 className="text-3xl tracking-tight text-dark-100 capitalize font-bold sm:text-4xl md:text-5xl text-center space-y-5">
                <span className="block">No file selected !</span>
                <span className="block">Please select a note to start editing</span>
            </h2>
        </div>
    );
};

export default EmptyEditor;
