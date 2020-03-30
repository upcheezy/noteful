import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import STORE from '../dummy-store';
import NoteListNav from '../NoteListNav/NoteListNav';
import { getNotesForFolder, findNote, findFolder } from '../notes_helpers';
import './App.css';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageNav from '../NotePageNav/NotePageNav';

export default class App extends Component {
  state = {
    notes: [],
    folders: [],
  }

  componentDidMount() {
    this.setState(STORE);
  }

  renderNavRoutes() {
    const { notes, folders } = this.state;
    return (
      <>
        {/* why is the first operation in curly brackets? */}
          {/* because we are starting with a map method (js) and not JSX */}
        {
          // what is the first item (backslash) in this array for? When it's taken out the data doesn't display.
            // dynamic path variable 
          ['/','/folder/:folderId'].map(path =>
            <Route
              exact
              key={path}
              path={path}
              render={routeProps =>
                <NoteListNav
                  folders={folders}
                  notes={notes}
                  {...routeProps}
                />
              }
            />
          )
        }

        <Route
          path="/note/:noteId"
          render={routeProps => {
            // why is noteId in brackets? 
              // destruction state same as below
              // const noteId = routeProps.match.params.noteId;
            // console.log(routeProps);
            const { noteId } = routeProps.match.params;
            // where is notes delcared that this is using and what else is it doing?
            const note = findNote(notes, noteId) || {};
            const folder = findFolder(folders, note.folderId);
            return <NotePageNav />
          }}
        />

      </>
    )
  }

  renderMainRoutes() {
    const { notes, folders } = this.state;
    return (
      <>
        {
          ['/', '/folder/:folderId'].map(path =>
            <Route
              exact
              key={path}
              path={path}
              render={routeProps => {
                const { folderId } = routeProps.match.params;
                const notesForFolder = getNotesForFolder(notes, folderId);
                return (
                  <NoteListMain
                    {...routeProps}
                    notes={notesForFolder}
                  />
                )
              }
              }
            />
          )
        }
      </>
    )
  }

  render() {
    // console.log(this.state);
    return (
      <div className='App'>
        <header>
          <Link to='/'>Noteful</Link>
        </header>
        <div className='main_cont'>
          <nav>
            {this.renderNavRoutes()}
          </nav>
          <main>
            {this.renderMainRoutes()}
          </main>
        </div>
      </div>
    )
  }
}