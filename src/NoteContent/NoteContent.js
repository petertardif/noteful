import React, { Component } from 'react';
import './NoteContent.css';

export default class NoteContent extends Component {
  render() {
    const noteContext = this.props.i;
    return (
      <div className='Note__content'>
        <p key={noteContext.id}>
          {noteContext.content}
        </p>
      </div>
    )
  }
}