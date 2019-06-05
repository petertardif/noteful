import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { NotesContext } from '../NotesContext';
import './Sidebar.css';

export default class Sidebar extends Component {
    static contextType = NotesContext;
    render() {
        return (
            <section className='NoteListNav'>
                <ul className='NoteListNav__list' aria-live='polite'>
                        {this.context.folders.map(folder =>
                          <li key={folder.id}>
                            <NavLink 
                              className='NoteListNav__folder-link' 
                              to={`/folder/${folder.id}`}>{folder.name}
                            </NavLink>
                          </li>
                        )}
                </ul>
                <div className='NoteListNav__button-wrapper'>
                    <Link className='NoteListNav__add-folder-button' to={`/add-folder`}>+ Folder</Link>
                </div> 
            </section>
        )
    }
}