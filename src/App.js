import React, { Fragment, Component } from "react";
import { connect } from 'react-redux';
import Sidebar from "react-sidebar";
import SidebarContent from "./components/SidebarContent";
import Header from "./components/Header";
import { fetchAppointmentsDataFromApi, fetchSettingsDataFromApi, fetchClientsDataFromApi } from './store/actions/index'
import { Route, withRouter } from "react-router-dom"

// import SidebarContent from "./sidebar_content";

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
    this.props.fetchAppointments()
    this.props.fetchSettings()
    this.props.fetchClients()
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
          return <h1>Schedule content here</h1>
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
    fetchClients: () => dispatch(fetchClientsDataFromApi())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

