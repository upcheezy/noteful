import React, { Component } from "react";
import ValidationError from "../ValidationError/ValidationError";
import PropTypes from 'prop-types';
import config from '../config'

class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nname: {
        value: "",
        touched: false,
      },
      content: {
        value: "",
        touched: false,
      },
      folderId: "",
    };
  }

  validateName() {
    const name = this.state.nname.value.trim();
    if (name.length === 0) {
      return "Name is required";
    } else if (name.length < 3) {
      return "Name must be at least 3 characters long";
    }
    // console.log(name)
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // const { fname } = this.state;
    console.log(this.state);
    const requestOptions = {
      method: "POST",
      headers: { 
        "content-type": "application/json",
        Authorization: `Bearer ${config.API_KEY}`,
       },
      body: JSON.stringify({
        note_name: this.state.nname.value,
        note_content: this.state.content.value,
        folder_id: this.state.folderId,
      }),
    };
    fetch(`${config.API_ENDPOINT}/`, requestOptions)
      .then((response) => {
        // check if response is ok
        console.log("About to check for errors");
        if (!response.ok) {
          console.log("An error did occur, let's throw an error.");
          throw new Error("Something went wrong"); // throw an error
        }
        return response; // ok, so just continue
      })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        this.props.addNote(response);
        this.props.history.push("/");
      })
      .catch((err) => {
        this.setState({
          error: err.message,
        });
      });
    this.setState({ nname: { value: "" } });
  };

  updateName(name) {
    this.setState({ nname: { value: name, touched: true } });
  }

  updateContent(content) {
    this.setState({ content: { value: content, touched: true } });
  }

  updateFolderId(fid) {
    const currentId = this.props.folders.find(({ name }) => name === fid);
    this.setState({ folderId: currentId.id });
    // console.log(currentId.id);
  }

  handleClickCancel = () => {
    this.props.history.push("/");
  };

  render() {
    //   console.log(this.props);
    return (
      <form className="AddNoteForm" onSubmit={this.handleSubmit}>
        <h2>Add Note</h2>
        <label htmlFor="note-name">Note Name</label>
        <input
          type="text"
          name="Name"
          value={this.state.nname.value}
          onChange={(e) => this.updateName(e.target.value)}
        />
        {this.state.nname.touched && (
          <ValidationError message={this.validateName()} />
        )}
        <label htmlFor="note-content">Note Content</label>
        <input
          type="text"
          name="Content"
          value={this.state.content.value}
          onChange={(e) => this.updateContent(e.target.value)}
        />
        <select
          name="folderName"
          id="folderSelect"
          onChange={(e) => this.updateFolderId(e.target.value)}
        >
          <option value="none" selected hidden disabled>
            folder name
          </option>
          {this.props.folders.map((folder) => {
            return <option value={folder.name}>{folder.name}</option>;
          })}
        </select>
        <button
          type="reset"
          className="newFolder-button"
          onClick={this.handleClickCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="newFolder-button"
          disabled={this.state.nname.touched === false}
        >
          Save
        </button>
      </form>
    );
  }
}

AddNote.propTypes = {
    folders: PropTypes.array,
    addNote: PropTypes.func,
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object
}

export default AddNote;
