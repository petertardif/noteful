import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import NoteList from './NoteList/NoteList';
import NoteListFilter from './NoteListFilter/NoteListFilter';
import dummyStore from './dummy-store';
import NotePage from './NotePage/NotePage';
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
    return (
      <div className='App'>
        <nav>
        <Route
            exact
            path='/'
            render={(props) => 
              <Sidebar
                {...this.state}
              />
            } 
          />
          <Route
            path='/folder/:folderId'
            render={() => 
              <Sidebar
                {...this.state}
              />
            } 
          />
          <Route
            path='/note/:noteId'
            render={() => 
              <Sidebar
                {...this.state}
              />
            } 
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
            render={() => 
              <NoteList
                {...this.state} 
              />
            }
          />
          <Route 
            path='/folder/:folderId'
            render={(match) => 
              <NoteListFilter
                {...this.state} 
                {...match} 
                
              />
            }
          />
          <Route 
            path='/note/:noteId' 
            render={(match) => 
              <NotePage
                {...this.state}
                {...match}
              />
            }
          />
        </main>
      </div>
    );
  }
}


