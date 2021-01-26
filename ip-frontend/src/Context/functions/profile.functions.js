import actions from "../actions/profile.actions";
import axios from 'axios';
import {NOTIFICATION_TYPES, openNotification} from "../../Components/Notifications/notifications";
import history from '../../Routes/history'

const profileFunctions = dispatch => {
   
    const logout = () => {
        dispatch(actions.logout());
    };
    const login = async (email, password) => {
        var url = 'http://127.0.0.1:8080/login/?username=' + email + '&password=' + password
        await axios.get(url, {
            headers: {"Access-Control-Allow-Origin": "*"}
        }).then(response => {
            const token = response.data.token;
            if (response.data === 'login succesful') {
                openNotification('LOGIN', "Autentificarea s-a realizat cu succes", NOTIFICATION_TYPES.SUCCESS);
                dispatch(actions.authenticate(token))
            }
            else {
                openNotification('LOGIN', "Email sau parola gresita!", NOTIFICATION_TYPES.ERROR);
            }
        });
    };

    const signup = async (nume, pass, email, firstname, lastname, organizatie) => {
        var url = 'http://127.0.0.1:8080/users/createUser/?username=' + nume + '&password=' + pass +
        '&email=' + email + '&firstname=' + firstname + '&lastname=' + lastname + '&organizationName=' + organizatie
        axios.post(url, {
            headers: {"Access-Control-Allow-Origin": "*"}
        }).then(response => {
            const token = response.data.token;
            if (response.status === 200) {
                openNotification('SIGNUP', "Inregistrarea s-a realizat cu succes", NOTIFICATION_TYPES.SUCCESS);
                dispatch(actions.signup(token))
                getOrganisationInfo(organizatie).then(result => {
                    getMembersTemp(result.data.id).then(result => {
                        if (result.data.length === 1) {
                            makeAdmin(nume)
                        }
                    })
                })
                history.push('/login')
                setTimeout(function() {
                    window.location.reload()
                }, 1000)
            }
            else {
                openNotification('SIGNUP', "Contul exista deja / Nu a putut fi inregistrat contul!", NOTIFICATION_TYPES.ERROR);
            }
        })
    };

    const createResource = async(name, organisationId) => {
        var url = 'http://127.0.0.1:8080/resources/createResources/?name=' + name + '&organizationId=' + organisationId
        axios.post(url, {
            headers: {"Access-Control-Allow-Origin": "*"}
        }).then(response => {
            if (response.data === 'ok') {
                openNotification('Add Resource', "Adaugarea de resursa s-a implinit cu succes", NOTIFICATION_TYPES.SUCCESS);
            } else {
                openNotification('Add Resource', "Adaugarea de resursa a esuat", NOTIFICATION_TYPES.ERROR);
            }
        })
    }

    const deleteResource = async(resourceName) => {
        var url = 'http://127.0.0.1:8080/resources/deleteResource/?name=' + resourceName
        axios.delete(url, {
            headers: {"Access-Control-Allow-Origin": "*"}
        }).then(response => {
            if (response.data === 'ok') {
                openNotification('Delete Resource', "Stergerea de resursa s-a implinit cu succes", NOTIFICATION_TYPES.SUCCESS);
            } else {
                openNotification('Delete Resource', "Stergerea de resursa a esuat", NOTIFICATION_TYPES.ERROR);
            }
        })
    }

    const getProfile = async(username) => {
        var url = 'http://127.0.0.1:8080/users/getUserByUsername/?username=' + username
        await axios.get(url, {
            headers: {"Access-Control-Allow-Origin": "*"}
        }).then(response => {
            dispatch(actions.details(response.data))
        })
    }

    const getOrganisationInfo = async(organisationName) => {
        var url = 'http://127.0.0.1:8080/organizations/getOrganizationByName/?name=' + organisationName
        return await axios.get(url, {
            headers: {"Access-Control-Allow-Origin": "*"}
        })
    }

    const getMembersTemp = async(organizationId) => {
        var url = 'http://127.0.0.1:8080/users/getUsersByOrganization/?id=' + organizationId
        return await axios.get(url, {
            headers: {"Access-Control-Allow-Origin": "*"}
        })
    }

    const getMembers = async(organizationId) => {
        var url = 'http://127.0.0.1:8080/users/getUsersByOrganization/?id=' + organizationId
        await axios.get(url, {
            headers: {"Access-Control-Allow-Origin": "*"}
        }).then(response => {
            dispatch(actions.members(response.data))
        })
    }

    const getResources = async(organizationId) => {
        var url = 'http://127.0.0.1:8080/resources/getResourcesByOrganizationId/?id=' + organizationId
        axios.get(url, {
            headers: {"Access-Control-Allow-Origin": "*"}
        }).then(response => {
            dispatch(actions.resources(response.data))
        })
    }

    const getUserProfile = async(userId) => {
        var url = 'http://127.0.0.1:8080/users/getUser/?id=' + userId
        await axios.get(url, {
            headers: {"Access-Control-Allow-Origin": "*"}
        }).then(response => {
            dispatch(actions.userprofile(response.data))
        })
    }

    const getResourceProfile = async(resourceName) => {
        var url = 'http://127.0.0.1:8080/resources/getResourceByName/?name=' + resourceName
        await axios.get(url, {
            headers: {"Access-Control-Allow-Origin": "*"}
        }).then(response => {
            dispatch(actions.resourceprofile(response.data))
        })
    }

   const reserveResource = async(username, resourceName, estimatedTime) => {
        var url = 'http://127.0.0.1:8080/resources/reserve/?username=' + username +
        '&resourceName=' + resourceName + '&estimatedTime=' + estimatedTime
        axios.put(url, {
            headers: {"Access-Control-Allow-Origin": "*"}
        })
   }

   const unreserveResource = async(username, resourceName) => {
        var url = 'http://127.0.0.1:8080/resources/unreserve/?username=' + username + '&resourceName=' + resourceName
        axios.put(url, {
            headers: {"Access-Control-Allow-Origin": "*"}
        })
   }

    const subscribe = async(username, resourceName) => {
        var url = 'http://127.0.0.1:8080/resources/subscribe/?username=' + username + '&resourceName=' + resourceName
        axios.post(url, {
           headers: {"Access-Control-Allow-Origin": "*"}
        }).then(response => {
            if (response.data === 'ok') {
                openNotification('Subscribe', "Te-ai abonat cu succes", NOTIFICATION_TYPES.SUCCESS);
            } else {
                openNotification('Subscribe', 'Abonarea nu s-a putut realiza cu succes', NOTIFICATION_TYPES.ERROR);
            }
        })
   }

   const createOrganisation = async(organisationName) => {
        var url = 'http://127.0.0.1:8080/organizations/createOrganization/?name=' + organisationName
        axios.post(url, {
            headers: {"Access-Control-Allow-Origin": "*"}
         }).then(response => {
             if (response.data === 'ok') {
                openNotification('Create', "Organizatia a fost creata cu succes", NOTIFICATION_TYPES.SUCCESS);
                history.push('/signup')
                setTimeout(function() {
                    window.location.reload()
                }, 1000)
             } else {
                openNotification('Create', 'Organizatia nu a putut fi creata', NOTIFICATION_TYPES.ERROR);
             }
         })
   }

   const makeAdmin = async(username) => {
       var url = 'http://127.0.0.1:8080/users/makeUserAdmin/?username=' + username
        axios.put(url, {
            headers: {"Access-Control-Allow-Origin": "*"}
        })
   }


    const getSession = () => {
        dispatch(actions.getSession());
    };
    const changePage = page => {
        dispatch(actions.changeTab(page));
    };
    const getCurrentPage = () => {
        dispatch(actions.getActivePage);
    };
    return {
        logout,
        login,
        signup,
        getSession,
        changePage,
        getCurrentPage,
        getProfile,
        getMembers,
        getResources,
        getUserProfile,
        getResourceProfile,
        reserveResource,
        unreserveResource,
        subscribe,
        createOrganisation,
        makeAdmin,
        getOrganisationInfo,
        getMembersTemp,
        createResource,
        deleteResource
    };
};

export default profileFunctions;
