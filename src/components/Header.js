import React, { useState } from "react";
import '../styles/lock.css'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';

import { adminLoginFetch, adminLogout } from '../store/actions/index'

const styles = {
  root: {
    fontFamily:
      '"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
    fontWeight: 300
  },
  header: {
    backgroundColor: "#03a9f4",
    color: "white",
    padding: "16px",
    fontSize: "1.5em"
  }
};

const Header = props => {
  const [formState, stateChange] = useState({
    email: '',
    password: ''
  })
  const [verified, setVerified] = useState(false)
  const [modalOpen, setModalOpen] = React.useState(false);

  function handleClickOpen() {
    setModalOpen(true);
  }

  function handleClose() {
    // set form state empty 
    stateChange({
      email: '',
      password: ''
    })
    setModalOpen(false);
  }

  function handleUnlock() {
    console.log('unlock')
  }

  function handleLock() {
    // Remove the token from localStorage
    localStorage.removeItem("token")
    // Remove the user object from the Redux store
    props.handleLogout()
  }

  return (
    <Grid container alignItems='center' justify="center" style={styles.header}>
      <Grid item xs={11}>{props.title}</Grid>

      {/* key icon */}
      <Grid
        onClick={() => {
          if (props.auth.currentUser) {
            // if logged in, then logout process
            handleLock()
          } else {
            // not logged in yet, then login process
            // open form modal
            handleClickOpen()
          }
        }}
        className={`lock ${props.auth.currentUser ? 'unlocked' : ''}`
        }></Grid>

      {/* modal content */}
      <Dialog open={modalOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Authentication</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Enter Your Email Address And Password To Unlock This Service.
          </DialogContentText>
          <Grid container justify='center' >
            <Grid item xs={10} style={{ marginTop: 10 }}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                value={formState.email}
                fullWidth
                onChange={(e) => {
                  stateChange({ ...formState, email: e.target.value })
                }}
              />
            </Grid>

            <Grid item xs={10} style={{ marginTop: 20, marginBottom: 20 }}>
              <TextField
                margin="dense"
                id="password"
                label="Password"
                type="password"
                value={formState.password}
                fullWidth
                onChange={(e) => {
                  stateChange({ ...formState, password: e.target.value })
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} >
            Cancel
          </Button>
          <Button
            onClick={() => {
              // unlock process
              props.handleLogin(formState)
            }}
            color="primary">
            Unlock
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

const mapStateToProps = function (state) {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleLogin: (data) => {
      return dispatch(adminLoginFetch(data))
    },
    handleLogout: () => {
      return dispatch(adminLogout())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);