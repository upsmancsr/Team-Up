import React, { Component } from 'react';
import axios from 'axios';

import styles from '../scss/components/TeamDashboard.module.scss';

class TeamDashboard extends Component {
  constructor() {
    super();
    this.state = {
        team: null,
        error: null
    };
  } 

  componentDidMount() {
    axios.get('/api/teams/singleteam')
      .then(response => {
        this.setState({ team: response.data });
      })
      .catch(error => {
        console.log(error);
        this.setState({ error: error });
      })
  }

  render() {
    const { team } = this.state;
    return (
      <div className={styles.TeamDashboard}>
        <p><b>Team Name:</b> {team.name}</p>
        <div className={styles.teamMembersContainer}>
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
