import React, { Component } from 'react';
import axios from 'axios';

import styles from '../scss/components/TeamDashboard.module.scss';

class TeamDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        team: null,
        error: null
    };
  } 

  componentDidMount() {
    const { teamId } = this.props.match.params;
    axios.get(`/api/teams/singleteam/${teamId}`)
      .then(response => {
        this.setState({ team: response.data });
      })
      .catch(error => {
        console.log(error);
        this.setState({ error: error });
      })
  }

  render() {
    console.log('TeamDash state on render:', this.state);
    const { team } = this.state;
    return (
        team &&
        <div className={styles.TeamDashboard}>
            <p><b>Team Name:</b> {team.name}</p>
            <div className={styles.teamMembersContainer}>
            <p>Team members:</p>
            <div className={styles.teamMembersList}>
                {team &&
                team.users.map((user, index) => {
                    return (
                    <div className={styles.row} key={index}>
                        <p>{user.firstName} {user.lastName}</p>
                    </div>
                    )
                })
                }
            </div>
            </div>
        </div>
    );
  }
};

export default TeamDashboard;
