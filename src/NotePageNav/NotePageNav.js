import React from 'react';
import Button from '../Button/Button';
import PropTypes from 'prop-types';

export default function NotePageNav(props) {
    return (
        <div className='NotePageNav'>
            <Button
                tag='button'
                role='link'
                onClick={() => props.history.goBack()}
                className='NotePageNav__back-button'
            >
                Back
            </Button>
            {props.folder && (
                <h3 className='NotePageNav__folder-name'>
                    {props.folder.name}
                </h3>
            )}
        </div>
    )
}

NotePageNav.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
    folder: PropTypes.object
}