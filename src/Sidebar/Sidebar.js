import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
// import { FoldersContext } from '../FoldersContext';
import { NotesContext } from '../NotesContext';

export default class Sidebar extends Component {
    static contextType = NotesContext;
    render() {
        return (
            <section>
                <ul aria-live='polite'>
                        {this.context.folders.map(folder =>
                          <li key={folder.id}>
                            <NavLink to={`/folder/${folder.id}`}>{folder.name}</NavLink>
                          </li>
                        )}
                </ul>
                <div>
                    <a href='#'>+ Folder</a>
                </div>
            </section>
        )
    }
}