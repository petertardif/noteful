import React, { Component } from 'react';
import { NotesContext } from '../NotesContext';

export default class AddNote extends Component {
    static defaultProps = {
        folders: [],
    };

    static contextType = NotesContext;

    handleSubmit(event) {
      event.preventDefault();
      const today = new Date().toDateString();
      debugger;
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
    render() {
      const { folders } = this.context
      return (
        <section>
          <h2>Create a note</h2>
          <form
            onSubmit={event => this.handleSubmit(event)}
          >
            <div className='field'>
              <label htmlFor='note-name-input'>
                Name
              </label>
              <input type='text' id='note-name-input' name='note-name'/>
            </div>
            <div className='field'>
              <label htmlFor='note-content-input'>
                Content
              </label>
              <input id='note-content-input' name='content'/>
            </div>
            <div className='field'>
              <label htmlFor='note-folder-select'>
                Folder
              </label>
              <select id='note-folder-select' name='choosenFolder'>
                <option value={null}></option>
                {folders.map(folder => 
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                )}
              </select>
            </div>
            <div>
              <button type='submit'>
                Add Note
              </button>
            </div>
          </form>
        </section>
      )
    }
}