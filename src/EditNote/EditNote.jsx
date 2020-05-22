import React, { Component } from "react";
// import ValidationError from "../ValidationError/ValidationError";
// import PropTypes from "prop-types";

export default class EditNote extends Component {
  state = {
    name: "",
    content: "",
    folderId: 0,
  };

  componentDidMount() {
    const notesUrl = "http://localhost:8000/notes";
    fetch(notesUrl, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer f3332591-addb-4571-b105-5165425549e6`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          this.setState({
            error: data.error,
          });
        } else {
          // console.log(data)
          // console.log(this.props.match.params.note_id);
          const newNote = data.find(
            (note) => note.id === parseInt(this.props.match.params.note_id)
          );
          //   data.forEach((element) => console.log(element));
          // console.log(newNote)
          this.setState({
            name: newNote.name,
            content: newNote.content,
            folderId: newNote.folderId,
          });
        }
      })
      .catch((err) => {
        this.setState({
          error: err.message,
        });
      });
  }

  handleNameInput = (e) => {
    this.setState({ name: e.target.value });
  };

  handleContent = (e) => {
    this.setState({ content: e.target.value });
  };

  updateFolderId(fid) {
    const currentId = this.props.folders.find(({ name }) => name === fid);
    this.setState({ folderId: currentId.id });
    // console.log(currentId.id);
  }

  handleClickCancel = () => {
    this.props.history.push("/");
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // get the form fields from the event
    const { name, content, folderSelect } = e.target;
    const note = {
      note_name: name.value,
      note_content: content.value,
      folderId: folderSelect.value
    };
    this.setState({ error: null });
    fetch(
      `http://localhost:8000/notes/${this.props.match.params.note_id}`,
      {
        method: "PATCH",
        body: JSON.stringify(note),
        headers: {
          "content-type": "application/json",
          authorization: `Bearer f3332591-addb-4571-b105-5165425549e6`,
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          // get the error message from the response,
          return res.json().then((error) => {
            // then throw it
            throw error;
          });
        }
      })
      .then(() => {
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error });
      });
    //   console.log(this.context);
  };

  render() {
    // console.log(this.props);
    const { content, name } = this.state;
    return (
      <form className="EditNote__form" onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="name">Title</label>
          <input 
            type="text" 
            value={name} 
            onChange={this.handleNameInput} 
            name='name'
            id='name'
          />
          <label htmlFor="note-content">Content</label>
          <input 
            type="text" 
            value={content} 
            onChange={this.handleContent} 
            name='content'
            id='content' 
           />
          <select
            name="folderSelect"
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
        </div>
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
        >
          Save
        </button>
      </form>
    );
  }
}
