import React from "react";
import "./NoteListNav.css";
import { NavLink, Link } from "react-router-dom";
import Button from "../Button/Button";
import NotefulContext from "../NotefulContext";
import PropTypes from 'prop-types';

export default function NoteListNav(props) {
  return (
    <NotefulContext.Consumer>
      {value => {
        return (
          <>
            <div className="NoteListNav">
            
              <ul>
                {value.folders.map(folder => (
                  <li key={folder.id}>
                    <NavLink
                      className="NoteListNav__folder-link"
                      to={`/folder/${folder.id}`}
                    >
                      {folder.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <div className="NoteListNav_button">
                <Button
                  tag={Link}
                  to="/add-folder"
                  type="button"
                  className="NoteListNav__add-folder-button"
                >
                  Add Folder
                </Button>
              </div>
            </div>
          </>
        );
      }}
    </NotefulContext.Consumer>
  );
}

NoteListNav.defaulProps = {
  folders: []
};

NoteListNav.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object
}
