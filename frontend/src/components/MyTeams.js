import React, { Component } from 'react';
import axios from 'axios';

import './css/UserAccount.css';
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
    // console.log(teams);
    return (
      <div className='user-account-page'>
        <div className='users-list-container'>
          <h3>Your teams</h3>

          <div className='users-list'>
            {teams.length > 0 &&
              teams.map((team, index) => {
                return (
                  <div className='row' key={index}>
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
