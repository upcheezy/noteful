import React from 'react';
import './NoteListNav.css';
import { NavLink, Link } from 'react-router-dom'

export default function NoteListNav(props) {
    // console.log(props);
    return (
        <div className='NoteListNav'>
            <ul>
                {props.folders.map(folder =>
                    <li key={folder.id}>
                        <NavLink
                            className='NoteListNav__folder-link'
                            to={`/folder/${folder.id}`}
                        >
                            {folder.name}
                        </NavLink>
                    </li>
                )}
            </ul>
            <div className='NoteListNav_button'>
                <button>Add Folder</button>
            </div>
        </div>
    )
}

NoteListNav.defaulProps = {
    folders: []
}