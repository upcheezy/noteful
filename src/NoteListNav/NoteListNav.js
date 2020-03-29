import React from 'react';
import './NoteListNav.css';

export default function NoteListNav(props) {
    // console.log(props);
    return (
        <div>
            <ul>
                {props.folders.map(folder => 
                    <li key={folder.id}>
                        {folder.name}
                    </li>)}
            </ul>
        </div>
    )
}

NoteListNav.defaulProps = {
    folders: []
}