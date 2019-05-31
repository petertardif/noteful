import React from 'react';

export const NotesContext = React.createContext({
  notes: [],
  folders: [],
  addFolder: () => {},
  deleteFolder: () => {},
  addNote: () => {},
  deleteNote: () => {},
});
