import React from "react";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';

import { withRouter } from "react-router-dom"

const SidebarContent = (props) => {
  return (
    <List component="nav" aria-label="main mailbox folders">
      <ListItem
        button
        onClick={() => {
          props.history.push('/')
        }}
      >
        <ListItemIcon>
          <CalendarIcon />
        </ListItemIcon>
        <ListItemText primary="Schedule" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          props.history.push('/clients')
        }}
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Clients" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          props.history.push('/settings')
        }}
      >
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItem>
    </List>
  );
};

export default withRouter(SidebarContent)