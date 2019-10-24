import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className='landing-page-container'>
            <header className='landing-page-header'>
                Welcome to MSights Auth!
            </header>
        </div>
    );
}

export default withRouter(LandingPage);