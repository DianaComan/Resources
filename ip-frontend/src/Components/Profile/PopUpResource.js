import React from "react";
import Button from '@material-ui/core/Button';
import MainContext from "../../Context/provider/context";
import {useContext, useEffect} from 'react';
import moment from 'moment';

const PopUpResource = props => {
  const {resourceprofile} = useContext(MainContext).profile;
  const {details} = useContext(MainContext).profile;
  const {subscribe} = useContext(MainContext).profile;
  const {deleteResource} = useContext(MainContext).profile;
  if (resourceprofile.currentlyReservationTime !== 'none') {
    var dateObj = new Date(resourceprofile.currentlyReservationTime);
    var momentObj = moment(dateObj);
    var estimatedRelease = moment(momentObj).add(resourceprofile.estimatedTime, 'minutes').format('YYYY/MM/DD HH:mm:ss')
  }
 
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.toggle}>x</span>
        <label> Currently reservation time:  {resourceprofile.currentlyReservationTime}</label>
        <br/>
        <label> Currently reserved by: {resourceprofile.currentlyReservedBy}</label>
        <br/>
        <label> Estimated time: {resourceprofile.estimatedTime}</label>
        <br/>
        <label> Last reserved by: {resourceprofile.lastReservedBy}</label>
        <br/>
        <label> Estimated release time: {estimatedRelease ? (estimatedRelease) : ('none') } </label>
        <br/>
        <button variant="contained" color="primary" style={{position:'absolute', right:'1%', bottom:'1%'}} onClick={props.toggle}>
				  Close
        </button>

        {details.role === 'admin' ? (
          <button variant="contained" color="primary" style={{position:'absolute', left:'47%', bottom:'1%'}} onClick={() => {
              deleteResource(resourceprofile.name)
              props.toggle()
            }}>
          Delete
          </button>) : (null)
        } 

        <button variant="contained" color="primary" style={{position:'absolute', left:'1%', bottom:'1%'}} onClick={() => {
            subscribe(details.username, resourceprofile.name)
            props.toggle()
          }}>
				Subscribe
        </button>
      </div>
    </div>
  );
};
 
export default PopUpResource;