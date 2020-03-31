import React from 'react';
import './NoteListNav.css';
import { NavLink, Link } from 'react-router-dom'
import Button from '../Button/Button';

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
                <Button
                    tag={Link}
                    to='/add-folder'
                    type='button'
                    className='NoteListNav__add-folder-button'
                >   
                    Add Folder
                </Button>
            </div>
        </div>
    )
}

NoteListNav.defaulProps = {
    folders: []
}