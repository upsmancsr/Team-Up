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
            Team notes
        </div>
    );
};

export default TeamNotes;