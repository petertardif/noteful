import React from 'react';

const FoldersNotesContext = React.createContext({
    folders: [],
    notes: [],
    addFolder: () => {},
    deleteFolder: () => {},
    addNote: () => {},
    deleteNote: () => {},
})

export default FoldersNotesContext