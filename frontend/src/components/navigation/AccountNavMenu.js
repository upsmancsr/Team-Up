import React, { useState } from 'react';
import { connect } from 'react-redux';
import styles from '../../scss/components/AccountNavMenu.module.scss';

const AccountNavMenu = props => {
    const [open, setOpen] = useState(false);

    const handleToggleOpen = () => {
        setOpen(!open);
    };
    
    // const handleClose = () => {
    //     setOpen(false);
    // };

    return (
        <div>
            <button
                onClick={handleToggleOpen}
            >
                Menu
            </button>
            {open && 
                <div className={styles.dropdownContainer}>
                    <div className={styles.topRow}>
                        <div className={styles.row}>
                            <p className={styles.mainText}>Signed in as</p>
                            <p className={styles.subText}>{props.user.firstName} {props.user.lastName}</p>
                            <p className={styles.subText}>{props.user.email}</p>
                        </div>
                    </div>
                    {/* <div className={styles.row}>
                        <p className={styles.mainText}>Signed in as</p>
                        <p className={styles.subText}>{props.user.firstName} {props.user.lastName}</p>
                        <p className={styles.subText}>{props.user.email}</p>
                    </div> */}
                </div>
            }
        </div>
    );
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(
    mapStateToProps,
    null
)(AccountNavMenu);
