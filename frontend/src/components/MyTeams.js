import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NewTeamDialog from './NewTeamDialog';
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
                {teams.length && 
                <div className={styles.teamsList}>
                    {teams.length > 0 &&
                        teams.map((team, index) => {
                        return (
                            <Link to={`/TeamDashboard/${team._id}`} key={index}>
                                <div className={styles.row}>
                                    <p><b>Team Name:</b> {team.name}</p>
                                </div>
                            </Link>
                        )
                        })
                    }
                </div>
                }
            </div>
            <div>
                <Link to={'/myinvitations'}>
                    <button>
                        Team Invitations
                    </button>
                </Link>
            </div>
            <div>
                <NewTeamDialog />
            </div>
        </div>
    );
  }
};

export default MyTeams;
