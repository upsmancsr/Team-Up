import React, { useState } from 'react';
import NoteCard from './NoteCard';

import styles from './styles/NotesList.module.scss';

const NotesList = props => {
    const { user, notes } = props;
    const [showTagged, setShowTaggged] = useState(false);

    const handleToggleShowTagged = () => {
        setShowTaggged(!showTagged);
    };

    return (
        <div className={styles.NotesList}>
            <label>
                <input
                    type="checkbox"
                    id='showTagged'
                    checked={showTagged}
                    onChange={handleToggleShowTagged}
                />
                <b>Show notes I'm tagged in</b>
            </label>

            {notes.length ? (
                notes.map((note, index) => {
                    if (!showTagged || (showTagged && note.taggedUsers.includes(user.id))) {
                        return (
                            <NoteCard note={note} key={index} />
                        );
                    }
                })
            ) : (
                <p>No notes</p>
            )}

        </div>
    );
};

export default NotesList;