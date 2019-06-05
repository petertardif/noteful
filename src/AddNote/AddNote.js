import React, { Component } from 'react';
import { NotesContext } from '../NotesContext';
import ValidationError from '../ValidationError/ValidationError';
import PropTypes from 'prop-types';
import './AddNote.css';

export default class AddNote extends Component {
    static defaultProps = {
        folders: [],
        history: {
          push: () => {}
        }
    };

    static contextType = NotesContext;

    constructor(props) {
      super(props);
      this.state = {
        noteName: '',
        noteContent: '',
        noteFolder: '',
        noteNameValid: false,
        noteContentValid: false,
        noteFolderValid: false,
        formValid: false,
        validationMessages: {
          noteName: '',
          noteContent: '',
          noteFolder: ''
        }
      }
    }

    updateNoteName(noteName) {
      this.setState({noteName}, () => {this.validateNoteName(noteName)});
    }

    updateNoteContent(noteContent) {
      this.setState({noteContent}, () => {this.validateNoteContent(noteContent)});
    }

    updateNoteFolder(noteFolder) {
      this.setState({noteFolder}, () => {this.validateNoteFolder(noteFolder)});
    }

    handleSubmit(event) {
      event.preventDefault();
      const today = new Date().toDateString();
      const note = {
        name: event.target['note-name'].value,
        folderId: event.target['choosenFolder'].value,
        content: event.target['content'].value,
        modified: today,
      }
  
      fetch(`http://localhost:9090/notes`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(note),
      })
      .then(response => {
        if(!response.ok)
          return response.json().then(event => Promise.reject(event))
        return response.json()
      })
      .then(note => {
        this.context.addNote(note)
        this.props.history.push(`/note/${note.id}`)
      })
      .catch(error => {
        console.error({ error })
      })
    }

    validateNoteName(fieldValue) {
      const fieldErrors = {...this.state.validationMessages};
      let hasError = false;

      fieldValue = fieldValue.trim();
      if(fieldValue.length === 0) {
        fieldErrors.name = 'You must enter a note name.';
        hasError = true;
      }

      this.setState({
        validationMessages: fieldErrors,
        noteNameValid: !hasError
      }, this.formValid);
    }

    validateNoteContent(fieldValue) {
      const fieldErrors = {...this.state.validationMessages};
      let hasError = false;

      fieldValue = fieldValue.trim();
      if(fieldValue.length === 0) {
        fieldErrors.content = 'You must type content into this note.';
        hasError = true;
      }

      this.setState({
        validationMessages: fieldErrors,
        noteContentValid: !hasError
      }, this.formValid);
    }

    validateNoteFolder(fieldValue) {
      const fieldErrors = {...this.state.validationMessages};
      let hasError = false;

      fieldValue = fieldValue.trim();
      if(fieldValue === "empty") {
        fieldErrors.folder = 'You must select a folder for this note.';
        hasError = true;
      }

      this.setState({
        validationMessages: fieldErrors,
        noteFolderValid: !hasError
      }, this.formValid);
    }

    formValid() {
      this.setState({
        formValid: this.state.noteNameValid && this.state.noteContentValid && this.state.noteFolderValid
      });
    }

    render() {
      const { folders } = this.context
      return (
        <section className="AddNote">
          <h2>Create a note</h2>
          <form
            onSubmit={event => this.handleSubmit(event)}
          >
            <div className='field'>
              <label htmlFor='note-name-input'>
                Name
              </label>
              <input type='text' id='note-name-input' name='note-name' onChange={e => this.updateNoteName(e.target.value)}/>
              <ValidationError hasError={!this.state.noteNameValid} message={this.state.validationMessages.name}/>
            </div>
            <div className='field'>
              <label htmlFor='note-content-input'>
                Content
              </label>
              <input id='note-content-input' name='content' onChange={e => this.updateNoteContent(e.target.value)} />
              <ValidationError hasError={!this.state.noteContentValid} message={this.state.validationMessages.content}/>
            </div>
            <div className='field'>
              <label htmlFor='note-folder-select'>
                Folder
              </label>
              <select id='note-folder-select' name='choosenFolder' onChange={e => this.updateNoteFolder(e.target.value)}>
                <option value="empty"></option>
                {folders.map(folder => 
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                )}
              </select>
              <ValidationError hasError={!this.state.noteFolderValid} message={this.state.validationMessages.folder}/>
            </div>
            <div>
              <button type='submit' disabled={!this.state.formValid}>
                Add Note
              </button>
            </div>
          </form>
        </section>
      )
    }
}

AddNote.propTypes = {
  folders: PropTypes.array,
  history: PropTypes.object
}