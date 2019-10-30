import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import axios from 'axios';

class InviteDialog extends Component {
  state = {
    open: false,
    teamId: null,
    email: '',
    error: null
  };

  handleClickOpen = () => {
    const teamId = this.props.teamId;
    this.setState({ 
        open: true,
        teamId,
    }, () => console.log(this.state));
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleConfirm = event => {
    const { teamId, email } = this.state;
    const inviteData = {
        teamId,
        email
    }

    axios.post('api/teams/invite', inviteData)
        .then(response => {
            this.setState({ 
                email: '', open: false,
                error: null
            });
        })
        .catch(error => {
            console.log(error);
            this.setState({ error: error });
        });


    event.preventDefault();
  };

  render() {
    
    return (
        <div>
          <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                Invite members
          </Button>
          
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            
              <div>
                <DialogTitle id="form-dialog-title">Invite members</DialogTitle>

                <DialogContent>
                  <DialogContentText>
                    Enter an email address to invite them to join
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    name="email"
                    label="email"
                    type="text"
                    required={true}
                    value={this.state.email}
                    onChange={this.onChange}
                    fullWidth
                  />
                </DialogContent>

                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleConfirm} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
              </div>
            
          </Dialog>
          {this.state.error && <p>Error inviting user</p>}
        </div>
    );
  }
}

export default InviteDialog;