import React from "react";
import { Link } from "react-router-dom";
import NotefulContext from "../NotefulContext";
import PropTypes from 'prop-types';
import config from '../config';

function deleteNote(noteId, cb) {
  fetch(`${config.API_ENDPOINT}/${noteId}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json,",
      Authorization: `Bearer ${config.API_KEY}`,
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
      cb(noteId)
      this.props.history.push("/");
    })
    .catch(error => {
      console.log(error);
    });
}

export default function Note(props) {
  return (
    <NotefulContext.Consumer>
      {(value) => {
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
                        console.log(value)
                        console.log(props)
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