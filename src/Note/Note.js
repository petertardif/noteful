import React from 'react';
import { Link } from 'react-router-dom';

export default function Note(props) {
    const date = new Date(props.modified).toDateString();
    return (
        <li key={props.id}>
            <div>
                <h2><Link to={`/note/${props.id}`}>{props.name}</Link></h2>
                <button>Delete</button>
                <div>
                    Modified <span>{date}</span> 
                </div>
                <p>{props.content}</p>
            </div>
        </li>
    )
}