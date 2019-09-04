import React from "react";
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import moment from 'moment'

const ScheduleContent = props => {

  const upcomingApp = props.appointments ? nextAppointment(props.appointments) : []
  const upcomingClient = upcomingApp && props.clients ? findClientById(upcomingApp.client_id, props.clients.slice(0)) : null

  return (
    <Grid container justify="center">
      <Grid item xs={12} style={{ margin: 20 }}>
        <h2>Upcoming appointment:</h2>
        <h3>
          {upcomingApp && upcomingApp.length != 0 ? `${moment(upcomingApp.start_at).utcOffset(0).format("YYYY/MM/DD  HH:mm")}  ~  ${moment(upcomingApp.end_at).utcOffset(0).format("HH:mm")} ${upcomingClient && upcomingClient.first_name} ${upcomingClient && upcomingClient.last_name} ${upcomingClient && upcomingClient.email}` : "There is no appointment"}
        </h3>
      </Grid>
      <Grid item xs={12}>

      </Grid>
    </Grid>
  );
};

function nextAppointment(appointments) {
  return appointments.sort((a, b) => {
    return new Date(a.start_at) - new Date(b.start_at);
  })[0]
}

function findClientById(id, clients) {
  return clients.filter((client) => client.id == id)[0]
}

const mapStateToProps = function (state) {
  return {
    appointments: state.appointments,
    clients: state.clients
  }
}

export default connect(mapStateToProps)(ScheduleContent);