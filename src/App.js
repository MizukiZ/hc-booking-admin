import React, { Fragment, Component } from "react";
import { connect } from 'react-redux';
import Sidebar from "react-sidebar";
import SidebarContent from "./components/SidebarContent";
import Header from "./components/Header";
import { fetchAppointmentsDataFromApi, fetchSettingsDataFromApi, fetchClientsDataFromApi, fetchOptionsDataFromApi, getAdminProfileFetch } from './store/actions/index'
import { Route } from "react-router-dom"
import Grid from '@material-ui/core/Grid';

import ScheduleContent from "./components/ScheduleContent"
import ClientContent from "./components/ClientContent"
import SettingContent from "./components/SettingContent"

import { setTokenToRequestHeader } from './axiosConfig'
import './styles/textShadow.css'

const styles = {
  contentHeaderMenuLink: {
    textDecoration: "none",
    color: "white",
    padding: 8
  },
  content: {
    padding: "16px"
  },
  header: {
    backgroundColor: "#03a9f4",
    color: "white",
    height: '60px'
  }
};

class App extends Component {

  componentDidMount() {
    this.props.getAdmin()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.auth.currentUser !== this.props.auth.currentUser) {
      setTokenToRequestHeader()
      const isLoggedIn = this.props.auth.currentUser ? true : false
      // listen the login logout changes
      if (isLoggedIn) {
        this.props.fetchAppointments()
        this.props.fetchSettings()
        this.props.fetchClients()
        this.props.fetchOptions()
      }
    }
  }



  render() {
    return (
      <Sidebar
        sidebar={(
          <Fragment>
            <div style={styles.header}>
            </div>
            <SidebarContent />
          </Fragment>
        )
        }
        docked={true}
        sidebarClassName="hc-sidebar"
        transitions={true}
      >
        < Header title="Heart Councelling Admin Dashboard" >
        </Header >
        {this.props.auth.currentUser ?
          <Fragment>
            < Route path='/' exact component={() => {
              return <ScheduleContent />
            }} />
            <Route path='/clients/' component={() => {
              return <ClientContent />
            }} />
            <Route path='/settings/' component={() => {
              return <SettingContent />
            }} />
          </Fragment>
          :
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '80vh' }}
          >
            <Grid item xs={10}>
              <h1 className='non-auth-message'>Please Unlock With Your Email And Password</h1>
            </Grid>

          </Grid>}


      </Sidebar>
    );
  }
}


const mapStateToProps = function (state) {
  return {
    appointments: state.appointments,
    settings: state.appointments,
    clients: state.appointments,
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAppointments: () => dispatch(fetchAppointmentsDataFromApi()),
    fetchSettings: () => dispatch(fetchSettingsDataFromApi()),
    fetchClients: () => dispatch(fetchClientsDataFromApi()),
    fetchOptions: () => dispatch(fetchOptionsDataFromApi()),
    getAdmin: () => dispatch(getAdminProfileFetch())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

