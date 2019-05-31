import React, { Component } from 'react';
import Note from '../Note/Note';
import AddNote from '../AddNote/AddNote';
import { NotesContext } from '../NotesContext';

export default class NoteListFilter extends Component {
    static contextType = NotesContext;

    render() {
        let selectedFolder = this.context.folders.find(folder => 
             folder.id === this.props.match.params.folderId); 
        
        let notAtTopLevel = Object.keys(this.props.match.params).length > 0;

        let filteredNotes = this.context.notes.map(note => 
              selectedFolder.id === note.folderId ? <Note key={note.id} i={note} /> : null 
        );

        const displayNotes = (notAtTopLevel) ? filteredNotes : this.context.notes;

        return (
        <section>
            <ul aria-live='polite'>
                { displayNotes }
            </ul>  
            <AddNote />
        </section>
        )
    }
}