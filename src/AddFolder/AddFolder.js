import React, { Component } from "react";
import ValidationError from "../ValidationError/ValidationError";
import PropTypes from 'prop-types';

class AddFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      touched: false,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // const { fname } = this.state;
    // console.log(this);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: this.state.fname }),
    };
    fetch("http://localhost:9090/folders/", requestOptions)
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
        this.props.addFolder(response);
        this.props.history.push("/");
      })
      .catch((err) => {
        this.setState({
          error: err.message,
        });
      });
    this.setState({ fname: "" });
  };

  updateName(name) {
    this.setState({ fname: name, touched: true });
  }

  validateName() {
    const name = this.state.fname.trim();
    if (name.length === 0) {
      return "Name is required";
    } else if (name.length < 3) {
      return "Name must be at least 3 characters long";
    }
    // console.log(name)
  }

  handleClickCancel = () => {
    this.props.history.push("/");
  };

  render() {
    //   console.log(this.props);
    return (
      <form className="AddFolderForm" onSubmit={this.handleSubmit}>
        <h2>Add Folder</h2>
        <label htmlFor="folder-name">Folder Name</label>
        <input
          type="text"
          name="Name"
          value={this.state.fname}
          onChange={(e) => this.updateName(e.target.value)}
        />
        {this.state.touched && (
          <ValidationError message={this.validateName()} />
        )}
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
          disabled={this.state.touched === false}
        >
          Save
        </button>
      </form>
    );
  }
}

AddFolder.propTypes = {
    addFolder: PropTypes.func,
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object
}

export default AddFolder;
