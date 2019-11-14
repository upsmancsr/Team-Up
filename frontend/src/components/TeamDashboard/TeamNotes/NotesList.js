import React, { useState } from 'react';
import NoteCard from './NoteCard';

import styles from './styles/NotesList.module.scss';

const NotesList = props => {
    const { user, notes } = props;
    const [showTagged, setShowTaggged] = useState(false);

    const handleToggleShowTagged = () => {
        setShowTaggged(!showTagged);
    };

    const filteredNotes = notes.filter(note => {
        if (!showTagged) {
            return true;
        }
        if (showTagged && note.taggedUsers.find(tg => tg._id === user.id)) {
            return true;
        }
        return false;
    });

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

            {filteredNotes.length ? (
                filteredNotes.map((note, index) => {
                    return (
                        <NoteCard note={note} key={index} />
                    );
                })
            ) : (
                <p>No notes</p>
            )}

        </div>
    );
};

export default NotesList;