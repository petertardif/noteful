import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Note extends Component {
  static defaultProps = {
      notes: [],
  };

    render() {
      const noteProps = this.props;
      const date = new Date(noteProps.modified).toDateString();
      return (
        <li key={noteProps.id}>
            <div>
                <h2><Link to={`/note/${noteProps.id}`}>{noteProps.name}</Link></h2>
                <button>Delete</button>
                <div>
                    Modified <span>{date}</span> 
                </div>
                <p>{noteProps.content}</p>
            </div>
        </li>
    )
    }
    
}