import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Note from '../Note/Note';
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
            <div>
                <Link to={`/add-note`}>+ Note</Link>
            </div> 
          </section>
        );
    }
}