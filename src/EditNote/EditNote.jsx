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
          data.forEach((element) => console.log(element));
          //   console.log(data);
          this.setState({
            name: data.name,
            content: data.content,
            folderId: data.folderId,
          });
        }
      })
      .catch((err) => {
        this.setState({
          error: err.message,
        });
      });

    const foldersUrl = "http://localhost:8000/folders";
    fetch(foldersUrl, {
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

  //   validateName() {
  //     const name = this.state.nname.value.trim();
  //     if (name.length === 0) {
  //       return "Name is required";
  //     } else if (name.length < 3) {
  //       return "Name must be at least 3 characters long";
  //     }
  //     // console.log(name)
  //   }
  render() {
    return (
      <form className="EditNote__form">
        <div>
          <label htmlFor="name">Title</label>
          <input type="text" />
          {/* <ValidationError message={this.validateName()} /> */}
        </div>
      </form>
    );
  }
}
