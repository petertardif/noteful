import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import NoteList from './NoteList/NoteList';
import NoteListFilter from './NoteListFilter/NoteListFilter';
import dummyStore from './dummy-store';
import NotePage from './NotePage/NotePage';
import FoldersNotesContext from './FoldersNotesContext';
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
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      addFolder: this.addFolder,
      deleteFolder: this.deleteFolder,
      addNote: this.addNote,
      deleteNote: this.deleteNote,
    }
    return (
      <div className='App'>
        <FoldersNotesContext.Provider value={contextValue}>
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
        </FoldersNotesContext.Provider>
      </div>
    );
  }
}


