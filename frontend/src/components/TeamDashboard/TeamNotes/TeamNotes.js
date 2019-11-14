import React, { useEffect } from 'react';
import NewNoteForm from './NewNoteForm';
import NotesList from './NotesList';
import { connect } from 'react-redux';
import { getTeamNotes, addTeamNote } from '../../../Redux/reducers/teamNotes.js';

import styles from './styles/TeamNotes.module.scss';

function TeamNotes(props) {
    useEffect(() => {
        props.getTeamNotes(props.team._id);
    }, [props.team]);

    return (
        <div className={styles.TeamNotes}>
            <h4>Notes:</h4>
            <NewNoteForm user={props.user} team={props.team} addTeamNote={props.addTeamNote} />
            <NotesList user={props.user} notes={props.notes}/>
        </div>
    );
};

const mapStateToProps = state => ({
    user: state.user,
    notes: state.teamNotes.notes
});

export default connect(
    mapStateToProps,
    { getTeamNotes, addTeamNote }
)(TeamNotes);