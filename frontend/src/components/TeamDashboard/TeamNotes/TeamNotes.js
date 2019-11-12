import React, { useState, useEffect } from 'react';
import NotesList from './NotesList';
import { connect } from 'react-redux';
import { getTeamNotes, addTeamNote } from '../../../Redux/reducers/teamNotes.js';
import { TeamNotesContext } from '../../../ContextProviders/TeamNotesProvider';

import axios from 'axios';

import styles from './styles/TeamNotes.module.scss';

function TeamNotes(props) {
    // const [notes, setNotes] = useState([]);
    const [titleInput, setTitleInput] = useState('');
    const [contentInput, setContentInput] = useState('');
    const [taggedUsers, setTaggedUsers] = useState([]);
    const [tagMenuOpen, setTagMenuOpen] = useState(false)

    useEffect(() => {
        const taggedUsers = props.team.users.map(user => {
            return user = {
                ...user,
                tagged: false
            };
        });
        setTaggedUsers(taggedUsers);
        // axios.get(`api/notes/${props.team._id}`)
        //     .then(response => {
        //         console.log(response.data);
        //         setNotes(response.data); 
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
        props.getTeamNotes(props.team._id);
    }, [props.team]);

    const setInput = set => event => {
        set(event.target.value);
    };

    const handleToggleTagMenu = event => {
        setTagMenuOpen(!tagMenuOpen);
    };

    const handleToggleTagUser = event => {
        const users = taggedUsers.map(user => {
            return user = {
                ...user,
                tagged: user._id === event.target.id ? !user.tagged : user.tagged
            }; 
        });
        setTaggedUsers(users);
    };

    const handleSubmit = event => {
        const taggedUserIds = taggedUsers.filter(user => user.tagged === true).map(user => user._id);
        console.log(taggedUserIds);
        const noteData = {
            title: titleInput,
            content: contentInput,
            authorId: props.user.id,
            teamId: props.team._id,
            taggedUsers: taggedUserIds
        }

        // axios.post('api/notes/newnote', noteData)
        //     .then(response => {
        //         setTitleInput('');
        //         setContentInput('');
        //         setNotes(response.data.notes);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
        props.addTeamNote(noteData);

        event.preventDefault();
    };

    return (
        <div className={styles.TeamNotes}>
            <h4>Notes:</h4>
            <form className={styles.newNoteForm} onSubmit={handleSubmit}>
                <p>Post a new note:</p>
                <div className={styles.inputRow}>
                    <label htmlFor="titleInput">Title</label>
                    <input
                        onChange={setInput(setTitleInput)}
                        value={titleInput}
                        // error={errors.contentInput}
                        id="titleInput"
                        type="text"
                    />
                </div>
                <div className={styles.inputRow}>
                    <label htmlFor="contentInput">Content</label>
                    <input
                        onChange={setInput(setContentInput)}
                        value={contentInput}
                        // error={errors.contentInput}
                        id="contentInput"
                        type="text"
                    />
                </div>
                <div className={styles.tagUserMenu}>
                    <button className={styles.tagUserMenuBtn} type='button' onClick={handleToggleTagMenu}>
                        Tag users
                    </button>
                    {tagMenuOpen && 
                        <div className={styles.tagMenuDropDown}>
                            {taggedUsers.map((user, index) => {
                                return (
                                    <label key={index}>
                                        <input
                                            type="checkbox"
                                            id={user._id}
                                            checked={user.tagged}
                                            onChange={handleToggleTagUser}
                                        />
                                        <b>{user.email}</b>{' ('}{user.firstName}{' '}{user.lastName}{')'}
                                    </label>
                                )
                            })}
                        </div>
                    }
                </div>
                <div>
                    <button type="submit">
                        Post Note
                    </button>
                </div>
            </form>
                <NotesList notes={props.notes}/>
            
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