import React from "react";
import { Link } from "react-router-dom";
import NotefulContext from "../NotefulContext";

function deleteNote(noteId) {
  fetch(`http://localhost:9090/notes/${noteId}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json,"
    }
  })
    .then(res => {
      if (!res.ok) {
        return res.json().then(error => {
          throw error;
        });
      }
      return res.json();
    })
    .then(data => {
      console.log({ data });
    })
    .catch(error => {
      console.log(error);
    });
}

export default function Note(props) {
  return (
    <NotefulContext.Consumer>
      {value => {
        // console.log(value);
        return (
          <>
            <div className="Note">
              <h2 className="Note__title">
                <Link to={`/note/${props.id}`}>{props.name}</Link>
              </h2>
              {/* <p>{deleteNote(props.id)}</p> */}
              {/* ************************************ */}
              {/* add logic for deletion of note here  */}
              {/* ************************************ */}
              <button className="Note__delete" type="button">
                Remove Note
              </button>
            </div>
          </>
        );
      }}
    </NotefulContext.Consumer>
  );
}
