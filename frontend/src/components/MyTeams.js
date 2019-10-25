import React, { Component } from 'react';
import axios from 'axios';

import styles from '../scss/components/MyTeams.module.scss';

class MyTeams extends Component {
  constructor() {
    super();
    this.state = {
        teams: [],
        error: null
    };
  } 

  componentDidMount() {
    axios.get('/api/teams')
      .then(response => {
        this.setState({ teams: response.data });
      })
      .catch(error => {
        console.log(error);
        this.setState({ error: error });
      })
  }

  render() {
    const { teams } = this.state;
    return (
      <div className={styles.MyTeams}>
        <div className={styles.teamsListContainer}>
          <h3>Your teams</h3>

          <div className={styles.teamsList}>
            {teams.length > 0 &&
              teams.map((team, index) => {
                return (
                  <div className={styles.row} key={index}>
                    <p><b>Team Name:</b> {team.name}</p>
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

export default MyTeams;
