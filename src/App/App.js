import React, { Component } from 'react';
// import { Route, Link } from 'react-router-dom';
import STORE from '../dummy-store';
import NoteListNav from '../NoteListNav/NoteListNav';
// import { directive } from '@babel/types';

export default class App extends Component {
  state = {
    notes: [],
    folders: []
  }

  componentDidMount() {
    this.setState(STORE);
  }

  renderNavRoutes() {
    const { notes, folders } = this.state;
    return (
      <>
        {
          ['/', '/folder/:folderId'].map(path => 
                <NoteListNav 
                  folders={folders}
                  notes={notes}   
                />
            )
        }
      </>
    )
  }

  render() {
    // console.log(this.state);
    return (
      <div> {this.renderNavRoutes()} </div>
    )
  }
}