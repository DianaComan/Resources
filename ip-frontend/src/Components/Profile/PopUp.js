import React from "react";
import Button from '@material-ui/core/Button';
import MainContext from "../../Context/provider/context";
import {useContext, useEffect} from 'react';

const PopUp = props => {
  const {userprofile} = useContext(MainContext).profile;
  const {details} = useContext(MainContext).profile;
  const {makeAdmin} = useContext(MainContext).profile;
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.toggle}>x</span>
        <label> Nume: {userprofile.firstname}</label>
        <br/>
        <label> Prenume: {userprofile.lastname} </label>
        <br/>
        <label> Email: {userprofile.email}</label>
        <br/>
        <label> Nume utilizator: {userprofile.username}</label>
        <br/>
        <label> Role: {userprofile.role}</label>
        <button variant="contained" color="primary" style={{position:'absolute', right:'1%', bottom:'1%'}} onClick={props.toggle}>
				Close
        </button>
        {
          details.role === 'admin' && userprofile.role !== 'admin' ? (
            <button variant="contained" color="primary" style={{position:'absolute', left:'1%', bottom:'1%'}} onClick={() => {
              makeAdmin(userprofile.username)
              props.toggle()
            }}>
            Make admin
            </button>) : (
              null
            ) 
        }
       
      </div>
    </div>
  );
};
 
export default PopUp;