import React, { Fragment, Component } from "react";
import { connect } from 'react-redux';
import Sidebar from "react-sidebar";
import SidebarContent from "./components/SidebarContent";
import Header from "./components/Header";
import { fetchAppointmentsDataFromApi, fetchSettingsDataFromApi, fetchClientsDataFromApi, fetchOptionsDataFromApi, getAdminProfileFetch } from './store/actions/index'
import { Route } from "react-router-dom"

import ScheduleContent from "./components/ScheduleContent"
import ClientContent from "./components/ClientContent"
import SettingContent from "./components/SettingContent"

import { setTokenToRequestHeader } from './axiosConfig'

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

        {/* schedule page path */}
        <Route path='/' exact component={() => {
          return <ScheduleContent />
        }} />

        {/* clients page path */}
        <Route path='/clients/' component={() => {
          return <ClientContent />
        }} />

        {/* settings page path */}
        <Route path='/settings/' component={() => {
          return <SettingContent />
        }} />

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

