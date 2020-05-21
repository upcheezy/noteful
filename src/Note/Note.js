import React from "react";
import { Link } from "react-router-dom";
import NotefulContext from "../NotefulContext";
import PropTypes from 'prop-types';

function deleteNote(noteId, cb) {
  fetch(`http://localhost:8000/notes/${noteId}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json,",
      Authorization: `Bearer f3332591-addb-4571-b105-5165425549e6`,
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
      // console.log({ data });
      cb(noteId)
    })
    .catch(error => {
      console.log(error);
    });
}

export default function Note(props) {
  // console.log(props);
  return (
    <NotefulContext.Consumer>
      {(value) => {
        // console.log(value);
        return (
          <>
            <div className="Note">
              <h2 className="Note__title">
                <Link to={`/note/${props.id}`}>{props.name}</Link>
              </h2>
              <button className="Note__edit" type="button">
                <Link to={`/edit-note/${props.id}`}>Edit Note</Link>
              </button>
              <button className="Note__delete" 
                      type="button"
                      onClick={() => {
                          deleteNote(
                              props.id,
                              value.deleteNote,
                          )
                          props.history.push('/');
                      }}>
                Remove Note
              </button>
            </div>
          </>
        );
      }}
    </NotefulContext.Consumer>
  );
}

Note.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  modified: PropTypes.string,
  history: PropTypes.object
}