import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import styles from '../scss/components/LandingPage.module.scss';

const LandingPage = () => {
    return (
        <div className={styles.LandingPage}>
            <section className={styles.headerSection}>
                <p>Welcome to TeamUp! Create teams, invite friends, and start collaborating.</p>
                <Link to='/signup' className={styles.getStartedBtn}>
                    Get Started
                </Link>
            </section>
        </div>
    );
}

export default withRouter(LandingPage);