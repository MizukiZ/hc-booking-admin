import React, { Fragment, Component } from "react";
import { connect } from 'react-redux';
import Sidebar from "react-sidebar";
import SidebarContent from "./components/SidebarContent";
import Header from "./components/Header";
import { fetchAppointmentsDataFromApi, fetchSettingsDataFromApi, fetchClientsDataFromApi } from './store/actions/index'

// import SidebarContent from "./sidebar_content";

const styles = {
  contentHeaderMenuLink: {
    textDecoration: "none",
    color: "white",
    padding: 8
  },
  content: {
    padding: "16px"
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
            <Header title="Menu"></Header>
            <SidebarContent />
          </Fragment>
        )
        }
        docked={true}
        sidebarClassName="hc-sidebar"
      >
        < Header title="Heart Councelling Admin Dashboard" >
        </Header >
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

