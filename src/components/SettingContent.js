import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

const initialState = {
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
  sunday: false,
  startTime: '',
  endTime: '',
  duration: 0,
  interval: 0
}

const SettingContent = props => {
  const classes = useStyles();

  const [state, setState] = useState(initialState);

  useEffect(() => {
    const excludeDays = props.settings ? weekdaysConvertion(JSON.parse(props.settings.days_availability)) : []

    let newState = Object.assign({}, initialState)
    excludeDays.forEach((day) => {
      newState[day] = true
    })
    newState['startTime'] = props.settings ? props.settings.start_time : ''
    newState['endTime'] = props.settings ? props.settings.end_time : ''
    newState['duration'] = props.settings ? props.settings.duration : 0
    newState['interval'] = props.settings ? props.settings.interval : 0

    setState(newState)
  }, [props.settings])

  const handleCheckBoxChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const handleStartTimeChange = v => {
    setState({ ...state, startTime: v })
  }

  const handleEndTimeChange = v => {
    setState({ ...state, endTime: v })
  }

  const handleDurationChange = v => {
    setState({ ...state, duration: v })
  }

  const handleIntervalChange = v => {
    setState({ ...state, interval: v })
  }

  const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = state;
  return (
    <Grid container>
      <Grid item xs={6}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Days to exclude</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox color='primary' checked={monday} onChange={handleCheckBoxChange('monday')} value={1} />}
              label="Monday"
            />
            <FormControlLabel
              control={<Checkbox color='primary' checked={tuesday} onChange={handleCheckBoxChange('tuesday')} value={2} />}
              label="Tuesday"
            />
            <FormControlLabel
              control={
                <Checkbox color='primary' checked={wednesday} onChange={handleCheckBoxChange('wednesday')} value={3} />
              }
              label="Wednesday"
            />
            <FormControlLabel
              control={
                <Checkbox color='primary' checked={thursday} onChange={handleCheckBoxChange('thursday')} value={4} />
              }
              label="Thursday"
            />
            <FormControlLabel
              control={
                <Checkbox color='primary' checked={friday} onChange={handleCheckBoxChange('friday')} value={5} />
              }
              label="Friday"
            />
            <FormControlLabel
              control={
                <Checkbox color='primary' checked={saturday} onChange={handleCheckBoxChange('saturday')} value={6} />
              }
              label="Saturday"
            />
            <FormControlLabel
              control={
                <Checkbox color='primary' checked={sunday} onChange={handleCheckBoxChange('sunday')} value={0} />
              }
              label="Sunday"
            />
          </FormGroup>
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <Grid item xs={12}>
          <TextField
            id="startTime"
            label="Start Time"
            value={state.startTime}
            margin="normal"
            variant="outlined"
            type='time'
            onChange={(e) => {
              handleStartTimeChange(e.target.value)
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="endTime"
            label="End Time"
            value={state.endTime}
            margin="normal"
            variant="outlined"
            type='time'
            onChange={(e) => {
              handleEndTimeChange(e.target.value)
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="duration"
            label="Duration(min)"
            value={state.duration}
            margin="normal"
            variant="outlined"
            type='number'
            onChange={(e) => {
              handleDurationChange(e.target.value)
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="Interval"
            label="Interval(min)"
            value={state.interval}
            margin="normal"
            variant="outlined"
            type='number'
            onChange={(e) => {
              handleIntervalChange(e.target.value)
            }}
          />
        </Grid>
      </Grid>
    </Grid >
  );
};

function weekdaysConvertion(excludedDaysArray) {
  const daysArr = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

  return excludedDaysArray.map((daysIndex) => daysArr[daysIndex])
}

const mapStateToProps = function (state) {
  return {
    settings: state.settings
  }
}

export default connect(mapStateToProps)(SettingContent);