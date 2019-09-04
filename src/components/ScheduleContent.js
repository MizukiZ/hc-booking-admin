import React, { useState } from "react";
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import moment from 'moment'
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler, WeekView, Appointments, Toolbar, DateNavigator
} from "@devexpress/dx-react-scheduler-material-ui";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const ScheduleContent = props => {
  const [currentDate, currentDateChange] = useState(new Date())
  const [selectedData, setSelectedData] = useState(null)
  const [open, setOpen] = React.useState(false);
  const upcomingApp = props.appointments ? nextAppointment(props.appointments) : []
  const upcomingClient = upcomingApp && props.clients ? findClientById(upcomingApp.client_id, props.clients.slice(0)) : null

  let scheduleData = props.appointments ? generateSchedule(props.appointments) : []

  const Appointment = ({
    children, style, ...restProps
  }) => {
    let bgColor = 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)'
    return (
      <Appointments.Appointment
        {...restProps}
        style={{
          ...style,
          background: bgColor
        }}
        onClick={() => {
          setSelectedData(children[1].props.data)
          setOpen(true)
        }}
      >
        {children}
      </Appointments.Appointment>
    )
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <Grid container justify="center">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Details</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {/*  dialog content here */}
            Option: {selectedData && findOptionById(selectedData.option_id, props.options.slice(0)).title}
            <br />
            Client: {selectedData && findOptionById(selectedData.client_id, props.clients.slice(0)).email}
            <br />
            DateTime: {selectedData && selectedData.startDate}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      <Grid item xs={12} style={{ margin: 20 }}>
        <h2>Upcoming appointment:</h2>
        <h3>
          {upcomingApp && upcomingApp.length !== 0 ? `${moment(upcomingApp.start_at).utcOffset(0).format("YYYY/MM/DD  HH:mm")}  ~  ${moment(upcomingApp.end_at).utcOffset(0).format("HH:mm")} ${upcomingClient && upcomingClient.first_name} ${upcomingClient && upcomingClient.last_name} ${upcomingClient && upcomingClient.email}` : "There is no appointment"}
        </h3>
      </Grid>
      <Grid item xs={12}>
        {props.settings &&
          <Scheduler
            data={scheduleData}
            height={700}
          >
            <ViewState
              currentDate={currentDate}
              onCurrentDateChange={(date) => {
                currentDateChange(date)
              }}
            />
            <WeekView
              startDayHour={Number(props.settings.start_time.split(":")[0])}
              // set end time from admin setting
              endDayHour={Number(props.settings.end_time.split(":")[0])}
            />
            <Toolbar />
            <DateNavigator />
            <Appointments appointmentComponent={Appointment} />
          </Scheduler>
        }
      </Grid>
    </Grid >
  );
};

function nextAppointment(appointments) {
  return appointments.sort((a, b) => {
    return new Date(a.start_at) - new Date(b.start_at);
  })[0]
}

function findClientById(id, clients) {
  return clients.filter((client) => client.id === id)[0]
}

function findOptionById(id, options) {
  return options.filter((option) => option.id === id)[0]
}

function generateSchedule(appointments) {
  let dynamicSchedule = []

  appointments.forEach((appointment) => {
    const scheduleObj = {
      startDate: moment(appointment.start_at).utcOffset(0).format("YYYY-M-DD HH:mm"),
      endDate: moment(appointment.end_at).utcOffset(0).format("YYYY-M-DD HH:mm"),
      client_id: appointment.client_id,
      option_id: appointment.option_id,
      title: appointment.content
    }
    dynamicSchedule.push(scheduleObj)
  })

  return dynamicSchedule
}

const mapStateToProps = function (state) {
  return {
    settings: state.settings,
    appointments: state.appointments,
    clients: state.clients,
    options: state.options
  }
}

export default connect(mapStateToProps)(ScheduleContent);