import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TeamNotes(props) {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        axios.get(`api/notes/${props.teamId}`)
            .then(response => {
                console.log(response.data);
                setNotes(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [props.teamId]);

    return (
        <div>
            {notes.length ? (
                notes.map((note, index) => {
                    return (
                        <div key={index}>
                            <p>{note.author.firstName} {note.author.lastName}</p>
                            <p>{note.title}</p>
                            <p>{note.content}</p>
                        </div>
                    )
                })
            ) : (
                <p>No notes</p>
            )}
        </div>
    );
};

export default TeamNotes;