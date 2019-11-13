import React from 'react';
import NoteCard from './NoteCard';

import styles from './styles/NotesList.module.scss';

const NotesList = props => {
    const { notes } = props;
    return (
        <div className={styles.NotesList}>
            {notes.length ? (
                notes.map((note, index) => {
                    return (
                        <NoteCard note={note} key={index} />
                    )
                })
            ) : (
                <p>No notes</p>
            )}
        </div>
    );
};

export default NotesList;