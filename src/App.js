import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import NoteList from './NoteList/NoteList';
import NoteListFilter from './NoteListFilter/NoteListFilter';
import dummyStore from './dummy-store';
import NotePage from './NotePage/NotePage';
import { NotesContext } from './NotesContext';
import './App.css';

export default class App extends Component {
  state = {
    notes: [],
    folders: [],
  }

  componentDidMount() {
    // fake date loading from API call
    setTimeout(() => this.setState(dummyStore), 600)
  }

  render() {
    const contextNotesValue = {
      notes: this.state.notes,
      addNote: this.addNote,
      deleteNote: this.deleteNote,
      folders: this.state.folders,
      addFolder: this.addFolder,
      deleteFolder: this.deleteFolder,
    }

    return (
      <div className='App'>
        <NotesContext.Provider value={contextNotesValue}>
          <nav>
            <Route
              exact
              path='/'
              component={Sidebar}
            />
            <Route
              path='/folder/:folderId'
              component={Sidebar}
            />
            <Route
              path='/note/:noteId'
              component={Sidebar}
            />
          </nav>
          <header role='banner'>
              <h1>
                <Link to="/">Noteful</Link>
              </h1>
          </header>
          <main className='content' aria-live='polite'>
            <Route 
              exact
              path='/' 
              component={NoteList}
            />
            <Route 
              path='/folder/:folderId'
              component={NoteListFilter}
            />
            <Route 
              path='/note/:noteId' 
              component={NotePage}
            />
          </main>
        </NotesContext.Provider>
      </div>
    );
  }
}


