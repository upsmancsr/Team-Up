import React from 'react';

import styles from './styles/NoteCard.module.scss';

const NoteCard = props => {
    const { note } = props;
    return (
        <div className={styles.NoteCard}>
            <p>Posted by: <b>{note.author.firstName} {note.author.lastName}</b></p>
            <p>Title: <b>{note.title}</b></p>
            <p>Tagged: {note.taggedUsers.map((user, index) => <span key={index}>{'@'}{user.firstName}{' '}{user.lastName}{' '}</span>)}</p>
            <p>{note.content}</p>
        </div>
    );
};

export default NoteCard;