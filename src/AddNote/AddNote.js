import React, { Component } from "react";

class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nname: "",
      content: "",
      folderId: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // const { fname } = this.state;
    console.log(this);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: this.state.nname,
        content: this.state.content,
        folderId: this.state.folderId,
      }),
    };
    fetch("http://localhost:9090/notes/", requestOptions)
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
            error: err.message
        });
      });
    this.setState({ fname: "" });
  };

  updateName(name) {
    this.setState({ nname: name });
  }

  updateContent(content) {
    this.setState({ content: content });
  }

  updateFolderId(fid) {
    const currentId = this.props.folders.find(({ name }) => name === fid);
    this.setState({ folderId: currentId.id });
    // console.log(currentId.id);
  }

  render() {
    return (
      <form className="AddNoteForm" onSubmit={this.handleSubmit}>
        <h2>Add Note</h2>
        <label htmlFor="note-name">Note Name</label>
        <input
          type="text"
          name="Name"
          value={this.state.fname}
          onChange={(e) => this.updateName(e.target.value)}
        />
        <label htmlFor="note-content">Note Content</label>
        <input
          type="text"
          name="Content"
          value={this.state.content}
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
        <button type="reset" className="newFolder-button">
          Cancel
        </button>
        <button type="submit" className="newFolder-button">
          Save
        </button>
      </form>
    );
  }
}

export default AddNote;
