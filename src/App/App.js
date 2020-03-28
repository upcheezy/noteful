import React, { Component } from 'react';
// import { Route, Link } from 'react-router-dom';
import STORE from '../dummy-store';
// import { directive } from '@babel/types';

export default class App extends Component {
  state = {
    notes: [],
    folders: []
  }

  componentDidMount() {
    this.setState({store: STORE});
    console.log(this.state);
  }

  render() {
    return (
      <div> hello </div>
    )
  }
}
