import React, { Fragment, Component } from "react";
import { connect } from 'react-redux';
import Sidebar from "react-sidebar";
import SidebarContent from "./components/SidebarContent";
import Header from "./components/Header";
import { fetchAppointmentsDataFromApi, fetchSettingsDataFromApi, fetchClientsDataFromApi, fetchOptionsDataFromApi } from './store/actions/index'
import { Route } from "react-router-dom"

import ScheduleContent from "./components/ScheduleContent"

// import SidebarContent from "./sidebar_content";

class App extends Component {

  componentDidMount() {
    this.props.fetchAppointments()
    this.props.fetchSettings()
    this.props.fetchClients()
    this.props.fetchOptions()
  }

  render() {
    return (
      <Sidebar
        sidebar={(
          <Fragment>
            <Header title="Menu"></Header>
            <SidebarContent />
          </Fragment>
        )
        }
        docked={true}
        sidebarClassName="hc-sidebar"
        transitions={false}
      >
        < Header title="Heart Councelling Admin Dashboard" >
        </Header >

        {/* schedule page path */}
        <Route path='/' exact component={() => {
          return <ScheduleContent />
        }} />

        {/* clients page path */}
        <Route path='/clients/' component={() => {
          return <h1>clients content here</h1>
        }} />

        {/* settings page path */}
        <Route path='/settings/' component={() => {
          return <h1>settings content here</h1>
        }} />

      </Sidebar>
    );
  }
}


const mapStateToProps = function (state) {
  return {
    appointments: state.appointments,
    settings: state.appointments,
    clients: state.appointments
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAppointments: () => dispatch(fetchAppointmentsDataFromApi()),
    fetchSettings: () => dispatch(fetchSettingsDataFromApi()),
    fetchClients: () => dispatch(fetchClientsDataFromApi()),
    fetchOptions: () => dispatch(fetchOptionsDataFromApi())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

