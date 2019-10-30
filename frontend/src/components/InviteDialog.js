import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import axios from 'axios';

function InviteDialog(props) {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    const inputSetter = set => event => {
        set(event.target.value);
    };

    const handleConfirm = event => {
        const inviteData = {
            teamId: this.props.teamId,
            email
        }

        axios.post('api/teams/invite', inviteData)
            .then(response => {
                setEmail('');
                setOpen(false);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });

        event.preventDefault();
    };
    
    return (
        <div>
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Invite members
          </Button>
          
          <Dialog
            open={open}
            onClose={handleClose}
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
                    value={email}
                    onChange={onChange}
                    fullWidth
                  />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
              </div>
            
          </Dialog>
          {error && <p>Error inviting user</p>}
        </div>
    );
}

export default InviteDialog;