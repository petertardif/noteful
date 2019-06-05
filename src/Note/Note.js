import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { NotesContext } from '../NotesContext';
import PropTypes from 'prop-types';
import './Note.css'

export default class Note extends Component {
    static defaultProps = {
        onDeleteNote: () => {},
      }

    static contextType = NotesContext;

    handleClickDelete = event => {
      event.preventDefault()
      const noteId = this.props.i.id

      fetch(`http://localhost:9090/notes/${noteId}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        },
    })
        .then(response => {
            if (!response.ok)
                return response.json().then(error => Promise.reject(error))
                    return response.json()
        })
        .then(() => {
          this.context.deleteNote(noteId)
          this.props.onDeleteNote(noteId)
        })
        .catch(error => {
            console.error(error);
        })
    };

    render() {
      const noteContext = this.props.i;
      const date = new Date(noteContext.modified).toDateString();
      return (
        <li key={noteContext.id}>
            <div className='Note'>
                <h2 className='Note__title'><Link to={`/note/${noteContext.id}`}>{noteContext.name}</Link></h2>
                <button
                    className='Note__delete'
                    type='button'
                    onClick={this.handleClickDelete}
                >Delete</button>
                <div className='Note__dates'>
                    <div className='Note__dates-modified'>
                        Modified <span className='Date'>{date}</span> 
                    </div>
                </div>
            </div> 
        </li>   
      )
    }
}

Note.propTypes = {
    i: PropTypes.shape({
        id: PropTypes.number,
        modified: PropTypes.instanceOf(Date),
        name: PropTypes.string,
        content: PropTypes.string
    }),
    onDeleteNote: PropTypes.func
}