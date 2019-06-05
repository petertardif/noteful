import React, { Component } from 'react';
import Note from '../Note/Note';
import { NotesContext } from '../NotesContext'
import PropTypes from 'prop-types';
import NoteContent from "../NoteContent/NoteContent"

export default class NotePage extends Component {
  static defaultProps = {
    match: {},
  }

  static contextType = NotesContext;

  render() {
    let selectedNote = this.props.match.params.noteId;

    let filteredNote = this.context.notes.map(note =>
      selectedNote === note.id ? <Note key={note.id} i={note} /> : null
    );

    let filteredNoteContent = this.context.notes.map(note =>
      selectedNote === note.id ? <NoteContent key={note.id} i={note} /> : null
    );

    return (
      <section className='NotePageMain'>
        {filteredNote}
        <div className='NotePageMain__content'>
          {filteredNoteContent}
        </div>
      </section>
    )
  }
}

NotePage.propTypes = {
  match: PropTypes.object
}