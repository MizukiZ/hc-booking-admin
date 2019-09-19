import React, { useState, useEffect, Fragment } from "react";
import '../styles/lock.css'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux';
import { adminLoginFetch, adminLogout, loginError } from '../store/actions/index'
import HashLoader from 'react-spinners/HashLoader';

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
  const [modalOpen, setModalOpen] = React.useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (!props.auth.currentUser) {
      // logged out, close the logout modal
      handleClose('logout')
    } else {
      // logged in. then close the login modal
      handleClose('login')
    }
  }, [props.auth.currentUser])

  function handleClickOpen(type) {

    if (type === 'login') {
      setModalOpen(true)
    } else {
      setLogoutModalOpen(true)
    }
  }

  function handleClose(type) {
    setLoading(false)

    // reset login error
    props.loginErrorReset()
    // set form state empty 
    stateChange({
      email: '',
      password: ''
    })

    if (type === 'login') {
      setModalOpen(false);
    } else {
      setLogoutModalOpen(false)
    }
  }

  function handleUnlock() {
    setLoading(true)
    props.handleLogin(formState)
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
            handleClickOpen('logout')
          } else {
            // not logged in yet, then login process
            // open form modal
            handleClickOpen('login')
          }
        }}
        className={`lock ${props.auth.currentUser ? 'unlocked' : ''}`
        }></Grid>

      {/* modal content */}
      <Dialog open={modalOpen} onClose={() => {
        handleClose('login')
      }} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Authentication</DialogTitle>
        <DialogContent>

          {props.auth.isFetching ?
            <Grid container justify="center">
              <Grid item xs={5}>
                <HashLoader
                  loading={loading}
                  color={"#03a9f4"}
                />
              </Grid>
            </Grid>
            :
            <Fragment>
              <Typography color='error' align='center' variant='subtitle2' style={{ minHeight: 25, fontWeight: 'bold' }}>{props.auth.authError ? "Wrong Input" : ''}</Typography>
              <DialogContentText align='center'>
                {loading && !props.auth.authError ? 'Please wait...' : 'Please Enter Your Email Address And Password To Unlock This Service.'}
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
            </Fragment>
          }
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              handleClose('login')
            }}
            disabled={props.auth.isFetching}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              // unlock process
              handleUnlock()
            }}
            disabled={props.auth.isFetching}
            color="primary">
            Unlock
          </Button>
        </DialogActions>
      </Dialog>


      {/* logout modal */}
      <Dialog open={logoutModalOpen} onClose={() => {
        handleClose('logout')
      }} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Lock</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are You Sure You Want To Logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            handleClose('logout')
          }} >
            Cancel
          </Button>
          <Button
            onClick={() => {
              // logout process
              handleLock()
            }}
            color="primary">
            Ok
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
    },
    loginErrorReset: () => {
      return dispatch(loginError(false))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);