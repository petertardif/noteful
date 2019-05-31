import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { NotesContext } from '../NotesContext';

export default class AddFolder extends Component {
  static contextType = NotesContext;

  handleSubmit(event) {
    event.preventDefault();
    const folder = {
      name: event.target['folder-name'].value
    }

    fetch(`http://localhost:9090/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(folder),
    })
    .then(response => {
      if(!response.ok)
        return response.json().then(event => Promise.reject(event))
      return response.json()
    })
    .then(folder => {
      this.context.addFolder(folder)
      this.props.history.push(`/folder/${folder.id}`)
    })
    .catch(error => {
      console.error({ error })
    })
  }

  render() {
    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
          <form 
            onSubmit={event => this.handleSubmit(event)}
          >
            <div className='field'>
              <label htmlFor='folder-name-input'>
                Name
              </label>
              <input type='text' id='folder-name-input' name='folder-name'/>
            </div>
            <div className='buttons'>
            <div>
                <Link to={`/add-note`}>+ Note</Link>
            </div>
            </div>
          </form>
      </section>
    )
  }
}