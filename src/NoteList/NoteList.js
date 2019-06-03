import React, { Component } from 'react';
import Note from '../Note/Note';
import AddNote from '../AddNote/AddNote';
import { NotesContext } from '../NotesContext';

export default class NoteList extends Component {
    static contextType = NotesContext;

    render() {
        return (
          <section>
            <ul aria-live='polite'>
               { this.context.notes.map(note => 
                <Note
                  key={note.id}
                  i={note}
                  // {...NotesContext}
                />
               )}
            </ul>  
            <AddNote />
          </section>
        );
    }
}