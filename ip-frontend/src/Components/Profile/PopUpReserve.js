import React from "react";
import Button from '@material-ui/core/Button';
import MainContext from "../../Context/provider/context";
import {useContext, useEffect} from 'react';
import {Input} from 'antd';
import styles from '../Login/Login.module.scss';
import actions from "../../Context/actions/profile.actions";

var value = '';

const handleChange = (event) => {
  event.persist();
  value = event.target.value
};

const PopUpReserve = props => {
  const {details} = useContext(MainContext).profile;
  const {reserveResource} = useContext(MainContext).profile;
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.toggle}>x</span>
        <Input
                    className={styles.input}
                    onChange={event => handleChange(event)}
                    size="large"
                    placeholder="Estimated time(minutes)" 
                    style={{
                      top:'4vh',
                      width:'50%'
                    }}/>
        <button variant="contained" color="primary" style={{position:'absolute', right:'1%', bottom:'1%'}} onClick={props.toggle}>
				Close
        </button>
        <button variant="contained" color="primary" style={{position:'absolute', left:'1%', bottom:'1%'}} onClick={
          () => {
            reserveResource(details.username, props.itemTemp.name, value)
            props.toggle()
            }}>
				Reserve
        </button>
      </div>
    </div>
  );
};
 
export default PopUpReserve;