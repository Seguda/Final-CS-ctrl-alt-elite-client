import React from 'react';
import {connect} from 'react-redux';
// import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';

function ScheduleList(props) {
  
  let buildList;
  try {
    const appointments = props.currentUser.appointments.filter((apt) => {
      if (moment(apt.time).format('YYYY MM DD') === moment(props.selectedDate).format('YYYY MM DD')) {
        return apt
      }
    });
    buildList = appointments.map((apt) => {
      return (
      <ListItem key={apt.id} button>
        <ListItemText
        primary={
          <div>
            <ul>
              <li>{moment(apt.time).format('MMMM Do YYYY, h:mm:ss A')}</li>              
              <li>Name: {apt.client.name}</li>              
              <li>Phone: {apt.client.phone}</li>
              <li>Email: {apt.client.email}</li>
              <li>Notes: {apt.notes}</li>
            </ul>
          </div>
        } />
        <IconButton aria-label="Delete">
        <DeleteIcon />
      </IconButton>
      </ListItem>
      )
    })
    return (
      <div >
        <List component="nav">
          {buildList}
        </List>
      </div>
    );
  } catch(err){
    return (
      <div >
        <List component="nav">
          <span>No Appointments to show</span>
        </List>
      </div>
    );
  }



}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  selectedDate: state.calendarReducer.selectedDate
});

export default connect(mapStateToProps)(ScheduleList);
