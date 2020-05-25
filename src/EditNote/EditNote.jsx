import React, { Component } from "react";
import config from '../config'

export default class EditNote extends Component {
  state = {
    name: "",
    content: "",
    folderId: 0,
  };

  componentDidMount() {
    const notesUrl = config.API_ENDPOINT;
    fetch(notesUrl, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${config.API_KEY}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          this.setState({
            error: data.error,
          });
        } else {
          const newNote = data.find(
            (note) => note.id === parseInt(this.props.match.params.note_id)
          );
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
      `${config.API_ENDPOINT}/${this.props.match.params.note_id}`,
      {
        method: "PATCH",
        body: JSON.stringify(note),
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${config.API_KEY}`,
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => {
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
  };

  render() {
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
