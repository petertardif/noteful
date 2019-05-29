import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import Note from '../Note/Note';

export default class NotePage extends Component {
  static defaultProps = {
    folders: [],
    notes: []
  };

  render() {
    const date = new Date(this.props.notes.modified).toDateString();
    // debugger;
    let selectedNote = this.props.notes.find(note =>
      note.id === this.props.match.params.noteId);

    let filteredNote = this.props.notes.map(note =>
      selectedNote.id === note.id ? <Note key={note.id} {...note} /> : null
    );
    return (
      <>
        {filteredNote}
      </>
    )
  }
}