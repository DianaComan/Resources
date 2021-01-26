import React from "react";
import Layout from "../../Containers/Layout";
import styles from './profile.module.scss';
import popupstyle from './popup.css'
import 'antd/dist/antd.css';
import { Tabs} from 'antd';
import MainContext from "../../Context/provider/context";
import {useContext} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import PopUp from "./PopUp";
import PopUpResource from "./PopUpResource";
import PopUpReserve from "./PopUpReserve";
import PopUpAdd from "./PopUpAdd";

const { TabPane } = Tabs;

var check = false;
var gotResources = false;
var itemTemp = ''

function reserveButtons(item, togglePopReserve, unreserveResource, details) {
    if (item.currentlyReservedBy === details.username) {
        return (
        <button className={styles.reserve_buton} key={item} onClick={() => {
            unreserveResource(details.username, item.name)
        }}>
            Unreserve
        </button>);
    } else {
        if (item.status === 'BUSY') {
            return (
                <button className={styles.reserve_buton} key={item} disabled={true}>
                    Reserve
                </button>
            );
        } else {
            return (
                <button className={styles.reserve_buton} key={item} onClick={() => {
                    itemTemp = item
                    togglePopReserve()
                }}>
                    Reserve
                </button>
            );
        }
    }
}

const content = (details, members, resources, togglePop, togglePopResource,
    getUserProfile, getResourceProfile, togglePopReserve, unreserveResource, togglePopAdd, 
    getResources) => {
    return (
        <div className={styles.titlu}> Profilul meu: {details.username}
            <Tabs>
                <TabPane className={styles.continut0} tab="Contul meu" key="1" active>
                    <p>Nume: {details.firstname}</p>
                    <p>Prenume: {details.lastname} </p>
                    <p>Email: {details.email}</p>
                    <p>Nume utilizator: {details.username}</p>
                    <p>Nume organizatie: {details.organizationName} </p>
                </TabPane>
                <TabPane className={styles.continut0} tab="Membrii organizatie" key="2" active>
                    <List component="nav" className={styles.continut0} aria-label="contacts">
                    {
                        members && members.map(function(item, i) {
                            return(
                            <ListItem button key={i} onClick={() => {
                                getUserProfile(item.id).then(() => {
                                    togglePop()
                                })}} style={{
                                    width: '20%',
                                    marginLeft: '46%'
                                }}>
                                <li>
                                {i}{'. '}{item.firstname}{' '}{item.lastname}
                                </li>
                            </ListItem>)
                        })
                    }
                    </List>
                </TabPane>
                <TabPane className={styles.continut} tab="Resurse" key="3" active>
                    {details.role === 'admin' ? (
                        <button className={styles.butonescu} onClick={() => {
                            getResources(details.organizationId)
                        }}>
                        Refresh resources        
                    </button>
                    ) : (
                        <button className={styles.butonescu3} onClick={() => {
                            getResources(details.organizationId)
                        }}>
                        Refresh resources        
                        </button>
                    )
                    }
                        
                    {
                        details.role === 'admin' ? (
                        <button className={styles.butonescu2} onClick={() => {
                            togglePopAdd()
                        }}>
                            Adauga resursa
                        </button>) : (null)
                    }
                    <List component="nav" className={styles.continut0} aria-label="contacts">
                        {
                            resources && resources.map(function(item, i) {
                                return(
                                    <div className ={styles.div}>
                                        <ListItem button key={i} onClick={() => {
                                            getResourceProfile(item.name).then(() => {
                                                togglePopResource()
                                            })
                                        }} style={{
                                            width: '20%',
                                            marginLeft: '46%'
                                        }}>
                                            <li>
                                            {item.name}
                                            <br/>
                                            <p>Status:{item.status}</p>
                                            </li>
                                        </ListItem>
                                        {reserveButtons(item, togglePopReserve, unreserveResource, details)}
                                    </div>
                                );
                            })
                        }
                    </List>
                </TabPane>
            </Tabs>
        </div>
    )
};


const Profile = () => {
    
    const [modalShow, setModalShow] = React.useState(false);
    const [resourceShow, setResourceShow] = React.useState(false);
    const [reserveShow, setReserveShow] = React.useState(false);
    const [addShow, setAddShow] = React.useState(false);

    const {getResources, resources} = useContext(MainContext).profile;
    const {details} = useContext(MainContext).profile;
    const {getMembers, members} = useContext(MainContext).profile;
    const {getUserProfile} = useContext(MainContext).profile;
    const {getResourceProfile} = useContext(MainContext).profile;
    const {unreserveResource} = useContext(MainContext).profile;
    
    const togglePop = () => {
        if (modalShow === false) {
            setModalShow(true)
        } else {
            setModalShow(false)
        }
    }

    const togglePopAdd = () => {
        if (addShow === false) {
            setAddShow(true)
        } else {
            setAddShow(false)
        }
    }

    const togglePopResource = () => {
        if (resourceShow === false) {
            setResourceShow(true)
        } else {
            setResourceShow(false)
        }
    }

    const togglePopReserve = () => {
        if (reserveShow === false) {
            setReserveShow(true)
        } else {
            setReserveShow(false)
        }
    }
    if (gotResources === false) {
        getResources(details.organizationId).then(() => {
            gotResources = true
        })
    }
    if (check === false) {
        getMembers(details.organizationId).then(() => {
            check = true;
        })
    }

    return (
        <div>
            <Layout content={content(details, members, resources, togglePop, togglePopResource,
                getUserProfile, getResourceProfile, togglePopReserve, unreserveResource, togglePopAdd, getResources)}/>
            <div>
                {modalShow ? <PopUp className={popupstyle} toggle={togglePop} /> : null}
            </div>
            <div>
                {resourceShow ? <PopUpResource className={popupstyle} toggle={togglePopResource} /> : null}
            </div>
            <div>
                {reserveShow ? <PopUpReserve className={popupstyle} toggle={togglePopReserve} itemTemp={itemTemp} /> : null}
            </div>
            <div>
                {addShow ? <PopUpAdd className={popupstyle} toggle={togglePopAdd} /> : null}
            </div>
        </div>
    )
};



export default Profile;
