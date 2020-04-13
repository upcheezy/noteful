import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button'
import Note from '../Note/Note';
import PropTypes from 'prop-types';

export default function NoteListMain(props) {
    // console.log(props);
    return (
        <section className='NoteListMain'>
            <ul>
                {props.notes.map(note =>
                    <li key={note.id}>
                        <Note
                            id={note.id}
                            name={note.name}
                            modified={note.modified}
                            history={props.history}
                        />
                    </li>
                )}
            </ul>
            <div className='add_note_button'>
                <Button
                    tag={Link}
                    to='/add-note'
                    type='button'
                    className='NoteListMain__add-note-button'
                >
                    Add Note
                </Button>
            </div>
        </section>
    )
}

NoteListMain.defaultProps = {
    notes: [],
}

NoteListMain.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
    notes: PropTypes.array
}