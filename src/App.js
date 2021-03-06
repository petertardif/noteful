import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import NoteList from './NoteList/NoteList';
import NoteListFilter from './NoteListFilter/NoteListFilter';
import AddFolder from './AddFolder/AddFolder'
import AddNote from './AddNote/AddNote';
import NotePage from './NotePage/NotePage';
import NoteListError from './NoteList/NoteListError';
import { NotesContext } from './NotesContext';
import './App.css';

export default class App extends Component {
  state = {
    notes: [],
    folders: [],
    error: null,
  }

  componentDidMount() {
    // fake date loading from API call
    // setTimeout(() => this.setState(dummyStore), 600)
    Promise.all([
      fetch(`http://localhost:9090/folders`),
      fetch(`http://localhost:9090/notes`) 
    ])
      .then(([foldersResponse,notesResponse]) => {
        if (!foldersResponse.ok) {
          return foldersResponse.json().then(error => Promise.reject(error))
        }
        if (!notesResponse) {
          return notesResponse.json().then(error => Promise.reject(error))
        }
        return Promise.all([
          foldersResponse.json(),
          notesResponse.json(),
        ])
      })
      .then(([folders,notes]) => {
        this.setState({ folders, notes})
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      })
  }

  handleAddFolder = folder => {
    this.setState({
      folders: [
        ...this.state.folders,
        folder
      ]
    })
  }

  handleAddNote = note => {
    this.setState({
      notes: [
        ...this.state.notes,
        note
      ]
    })
  }

  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    })
  }
  
  render() {
    const contextNotesValue = {
      notes: this.state.notes,
      addNote: this.handleAddNote,
      deleteNote: this.handleDeleteNote,
      folders: this.state.folders,
      addFolder: this.handleAddFolder,
      deleteFolder: this.deleteFolder,
    }

    return (
      <div className='App'>
        <NotesContext.Provider value={contextNotesValue}>
          <nav className='App__nav'>
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
            <Route 
              path='/add-folder'
              component={AddFolder}
            />
            <Route 
              path='/add-note'
              component={AddNote}
            />
          </nav>
          <header className='App__header' role='banner'>
              <h1>
                <Link to="/">Noteful</Link>
              </h1>
          </header>
          <main className='App__main' aria-live='polite'>
            {/* <Route 
              exact
              path='/' 
              component={NoteList}
            /> */}
            <Route 
              exact
              path='/' 
              render={() => 
                <NoteListError>
                  <NoteList
                    {...this.state} 
                  />
                </NoteListError>
              }
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


