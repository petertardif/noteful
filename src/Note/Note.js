import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { NotesContext } from '../NotesContext';

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
            <div>
                <h2><Link to={`/note/${noteContext.id}`}>{noteContext.name}</Link></h2>
                <button
                    type='button'
                    onClick={this.handleClickDelete}
                >Delete</button>
                <div>
                    Modified <span>{date}</span> 
                </div>
                <p>{noteContext.content}</p>
            </div>
        </li>   
      )
    }
}