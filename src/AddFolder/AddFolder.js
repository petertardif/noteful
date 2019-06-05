import React, { Component } from 'react';
import { NotesContext } from '../NotesContext';
import ValidationError from '../ValidationError/ValidationError';
import PropTypes from 'prop-types';
import './AddFolder.css';

export default class AddFolder extends Component {
  static defaultProps = {
    history: {
      push: () => {}
    },
  }

  static contextType = NotesContext;

  constructor(props) {
    super(props);
    this.state = {
      folderName: '',
      folderNameValid: false,
      formValid: false,
      validationMessages: {
        folderName: ''
      }
    }
  }

  updateFolderName(folderName) {
    this.setState({folderName}, () => {this.validateFolderName(folderName)});
  }

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

  validateFolderName(fieldValue) {
    const fieldErrors = {...this.state.validationMessages};
    let hasError = false;

    fieldValue = fieldValue.trim();
    if(fieldValue.length === 0) {
      fieldErrors.name = 'Folder Name is required.';
      hasError = true;
    } 

    this.setState({
      validationMessages: fieldErrors,
      folderNameValid: !hasError
    }, this.formValid);
  }

  formValid() {
    this.setState({
      formValid: this.state.folderNameValid
    });
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
              <input type='text' id='folder-name-input' name='folder-name' onChange={e => this.updateFolderName(e.target.value)} />
              <ValidationError hasError={!this.state.folderNameValid} message={this.state.validationMessages.name}/>
            </div>
            <div className='buttons'>
            <button type='submit' disabled={!this.state.formValid}>
              Add folder
            </button>
            </div>
          </form>
      </section>
    )
  }
}

AddFolder.propTypes = {
  history: PropTypes.object
}
