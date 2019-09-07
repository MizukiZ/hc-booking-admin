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
  const activePath = props.history.location.pathname

  return (
    <List component="nav" aria-label="main mailbox folders">
      <ListItem
        button
        onClick={() => {
          props.history.push('/')
        }}
        selected={activePath === '/' ? true : false}
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
        selected={activePath === '/clients' ? true : false}
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
        selected={activePath === '/settings' ? true : false}
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