import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { NotesContext } from '../NotesContext';

export default class Note extends Component {
    static contextType = NotesContext;
    
    render() {
        debugger;
      const noteContext = this.context.notes;
      const date = new Date(noteContext.modified).toDateString();
      return (
        <li key={noteContext.id}>
            <div>
                <h2><Link to={`/note/${noteContext.id}`}>{noteContext.name}</Link></h2>
                <button>Delete</button>
                <div>
                    Modified <span>{date}</span> 
                </div>
                <p>{noteContext.content}</p>
            </div>
        </li>   
      )
    }
}