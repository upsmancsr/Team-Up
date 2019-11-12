import React from 'react';
import { TeamNotesProvider } from './TeamNotesProvider.js';

function ContextProviders(props) {
    return (
        <TeamNotesProvider>{props.children}</TeamNotesProvider>
    );
}

export default ContextProviders;
