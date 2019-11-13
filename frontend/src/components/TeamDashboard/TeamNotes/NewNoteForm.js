import React, { useState, useEffect } from 'react';

import styles from './styles/NewNoteForm.module.scss';

const NewNoteForm = props => {
    // props include: team, addNewNote
    const [titleInput, setTitleInput] = useState('');
    const [contentInput, setContentInput] = useState('');
    const [taggedUsers, setTaggedUsers] = useState([]);
    const [tagMenuOpen, setTagMenuOpen] = useState(false);

    useEffect(() => {
        const taggedUsers = props.team.users.map(user => {
            return user = {
                ...user,
                tagged: false
            };
        });
        setTaggedUsers(taggedUsers);
    }, [props.team]);

    // method to update input field:
    const setInput = set => event => {
        set(event.target.value);
    };

    // method to open/close tag menu:
    const handleToggleTagMenu = event => {
        setTagMenuOpen(!tagMenuOpen);
    };

    // method to tag/untag users:
    const handleToggleTagUser = event => {
        const users = taggedUsers.map(user => {
            return user = {
                ...user,
                tagged: user._id === event.target.id ? !user.tagged : user.tagged
            }; 
        });
        setTaggedUsers(users);
    };

    // method to submit new note:
    const handleSubmit = event => {
        const taggedUserIds = taggedUsers.filter(user => user.tagged === true).map(user => user._id);
        // console.log(taggedUserIds);
        const noteData = {
            title: titleInput,
            content: contentInput,
            authorId: props.user.id,
            teamId: props.team._id,
            taggedUsers: taggedUserIds
        };
        props.addTeamNote(noteData);
        event.preventDefault();
    };

    return (
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
    );
};

export default NewNoteForm;