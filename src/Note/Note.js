import React from 'react';
import { Link } from 'react-router-dom';

export default function Note(props) {
    return (
        <div className='Note'>
            <h2 className='Note__title'>
                <Link to={`/note/${props.id}`}>
                    {props.name}
                </Link>
            </h2>
            <button className='Note__delete' type='button'>
                Remove Note
            </button>
        </div>
    )
}