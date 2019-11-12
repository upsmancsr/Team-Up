import React, { useContext } from 'react';
// import { connect } from 'react-redux';
// import { getTeamNotes } from '../../../Redux/reducers/teamNotes.js';
import { TeamNotesContext } from '../../../ContextProviders/TeamNotesProvider';

import NoteCard from './NoteCard';

import styles from './styles/NotesList.module.scss';

const NotesList = props => {
    // const notes = props.notes;
    const [state] = useContext(TeamNotesContext)(props.teamId);
    const notes = state.notes;
    return (
        <div className={styles.NotesList}>
            {(notes && notes.length) ? (
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

// const mapStateToProps = state => ({
//     notes: state.notes
// });

// export default connect(
//     mapStateToProps,
//     null
// )(NotesList);