import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
// import STORE from "../dummy-store";
import NoteListNav from "../NoteListNav/NoteListNav";
import { getNotesForFolder, findNote, findFolder } from "../notes_helpers";
import "./App.css";
import NoteListMain from "../NoteListMain/NoteListMain";
import NotePageNav from "../NotePageNav/NotePageNav";
import NotePageMain from "../NotePageMain/NotePageMain";
import NotefulContext from "../NotefulContext";
import AddFolder from "../AddFolder/AddFolder";
import AddNote from "../AddNote/AddNote";

export default class App extends Component {
  state = {
    notes: [],
    folders: [],
  };

  componentDidMount() {
    console.log(this.state);
    const notesUrl = "http://localhost:9090/notes";
    fetch(notesUrl)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          this.setState({
            error: data.error,
          });
        } else {
          this.setState({
            notes: data,
          });
        }
      })
      .catch((err) => {
        this.setState({
          error: err.message,
        });
      });

    const foldersUrl = "http://localhost:9090/folders";
    fetch(foldersUrl)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          this.setState({
            error: data.error,
          });
        } else {
          this.setState({
            folders: data,
          });
          // const keyz = Object.keys(data).map(key => data[key].name);
          // console.log(keyz);
          // this.setState({
          //   keyz
          // })
        }
      })
      .catch((err) => {
        this.setState({
          error: err.message,
        });
      });
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
          ["/", "/folder/:folderId"].map((path) => (
            <Route exact key={path} path={path} component={NoteListNav} />
          ))
        }

        <Route
          path="/add-folder"
          render={(routeProps) => {
            return <AddFolder addFolder={this.addFolder} {...routeProps} />;
          }}
        />

        <Route
          path="/note/:noteId"
          render={(routeProps) => {
            // why is noteId in brackets?
            // destructure state same as below
            // const noteId = routeProps.match.params.noteId;
            // console.log(routeProps);
            const { noteId } = routeProps.match.params;
            // where is notes delcared that this is using and what else is it doing?
            // above on the first line of method is where
            const note = findNote(notes, noteId) || {};
            const folder = findFolder(folders, note.folderId);
            return <NotePageNav {...routeProps} folder={folder} />;
          }}
        />
      </>
    );
  }

  deleteNote = (noteId) => {
    // console.log(noteId)
    // todo: remove bookmark with bookmarkId from state
    const newNotes = this.state.notes.filter((bm) => bm.id !== noteId);
    this.setState({
      notes: newNotes,
    });
  };

  addFolder = (folder) => {
    let newFolders = this.state.folders;
    newFolders.push(folder);
    this.setState({ folders: newFolders });
  };

  addNote = (note) => {
    let newNotes = this.state.notes;
    newNotes.push(note);
    this.setState({notes: newNotes});
  }

  renderMainRoutes() {
    const { notes } = this.state;
    return (
      <>
        {["/", "/folder/:folderId"].map((path) => (
          <Route
            exact
            key={path}
            path={path}
            render={(routeProps) => {
              const { folderId } = routeProps.match.params;
              const notesForFolder = getNotesForFolder(notes, folderId);
              return <NoteListMain {...routeProps} notes={notesForFolder} />;
            }}
          />
        ))}

        <Route
          path="/add-note"
          render={(routeProps) => {
            return <AddNote folders={this.state.folders} addNote={this.addNote} {...routeProps} />;
          }}
        />

        <Route
          path="/note/:noteId"
          render={(routeProps) => {
            const { noteId } = routeProps.match.params;
            const note = findNote(notes, noteId);
            return <NotePageMain {...routeProps} note={note} />;
          }}
        />
      </>
    );
  }

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.deleteNote,
    };
    // console.log(value);
    return (
      <NotefulContext.Provider value={value}>
        <div className="App">
          <header>
            <Link to="/">Noteful</Link>
          </header>
          <div className="main_cont">
            <nav>{this.renderNavRoutes()}</nav>
            <main>{this.renderMainRoutes()}</main>
          </div>
        </div>
      </NotefulContext.Provider>
    );
  }
}
