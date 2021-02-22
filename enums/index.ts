export enum DEFAULT_FOLDER {
    NAME = 'ca45dc72-49ee-40dc-adfd-14682ce73d2d', // unique name for notes without folder
}

export enum AppElement {
    NONE = 'NONE',
    FOLDER = 'FOLDER',
    NOTE = 'NOTE',
}

export enum AppStatus {
    VIEW = 'VIEW',
    EDIT = 'EDIT',
    CREATE = 'CREATE',
    DELETE = 'DELETE',
}

export const CODEMIRROR_OPTION = {
    mode: 'gfm',
    theme: 'material-palenight',
    lineNumbers: false,
    lineWrapping: true,
    styleActiveLine: { nonEmpty: true },
    viewportMargin: Infinity,
    keyMap: 'default',
    dragDrop: false,
    scrollPastEnd: false,
};
