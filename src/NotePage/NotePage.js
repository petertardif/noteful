import React, { Component } from 'react';
import Note from '../Note/Note';
import { NotesContext } from '../NotesContext'

export default class NotePage extends Component {
  static contextType = NotesContext;

  render() {
    let selectedNote = this.context.notes.find(note =>
      note.id === this.props.match.params.noteId);

    let filteredNote = this.context.notes.map(note =>
      selectedNote.id === note.id ? <Note key={note.id} i={note} /> : null
    );
    return (
      <>
        {filteredNote}
      </>
    )
  }
}