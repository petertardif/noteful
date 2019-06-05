import React, { Component } from 'react';
import Note from '../Note/Note';
import { NotesContext } from '../NotesContext'
import PropTypes from 'prop-types';

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

    return (
      <>
        {filteredNote}
      </>
    )
  }
}

NotePage.propTypes = {
  match: PropTypes.object
}