export const ACTION_TYPES = {
    AUTHENTICATE: 'AUTHENTICATE',
    SIGNUP: 'SIGNUP',
    LOGOUT: 'LOGOUT',
    GET_SESSION: 'GET_SESSION',
    CHANGE_PAGE: 'CHANGE_PAGE',
    GET_CURRENT_PAGE: 'GET_CURRENT_PAGE',
    DETAILS: 'DETAILS',
    MEMBERS: 'MEMBERS',
    RESOURCES: 'RESOURCES',
    USERPROFILE: 'USERPROFILE',
    RESOURCEPROFILE: 'RESOURCEPROFILE',
    RESERVERESOURCE: 'RESERVERESOURCE',
    UNRESERVERESOURCE: 'UNRESERVERESOURCE',
    SUBSCRIBE: 'SUBSCRIBE',
    CREATEORGANISATION: 'CREATEORGANISATION',
    MAKEADMIN: 'MAKEADMIN',
    CREATERESOURCE: 'CREATERESOURCE',
    DELETERESOURCE: 'DELETERESOURCE'
};

const actions = {
    authenticate: payload => ({
        type: ACTION_TYPES.AUTHENTICATE,
        payload
    }),
    signup: payload => ({
        type: ACTION_TYPES.SIGNUP,
        payload
    }),
    logout: payload => ({
        type: ACTION_TYPES.LOGOUT,
        payload
    }),
    getSession: payload => ({
        type: ACTION_TYPES.GET_SESSION,
        payload
    }),
    changeTab: payload => ({
        type: ACTION_TYPES.CHANGE_PAGE,
        payload
    }),
    getActivePage: payload => ({
        type: ACTION_TYPES.GET_CURRENT_PAGE,
        payload
    }),
    details: payload => ({
        type: ACTION_TYPES.DETAILS,
        payload
    }),
    members: payload => ({
        type: ACTION_TYPES.MEMBERS,
        payload
    }),
    resources: payload => ({
        type: ACTION_TYPES.RESOURCES,
        payload
    }),
    userprofile: payload => ({
        type: ACTION_TYPES.USERPROFILE,
        payload
    }),
    resourceprofile: payload => ({
        type: ACTION_TYPES.RESOURCEPROFILE,
        payload
    }),
    reserveresource: payload => ({
        type: ACTION_TYPES.RESERVERESOURCE,
        payload
    }),
    unreserveresource: payload => ({
        type: ACTION_TYPES.RESERVERESOURCE,
        payload
    }),
    subscribe: payload => ({
        type: ACTION_TYPES.SUBSCRIBE,
        payload
    }),
    createOrganisation: payload => ({
        type: ACTION_TYPES.CREATEORGANISATION,
        payload
    }),
    makeAdmin: payload => ({
        type: ACTION_TYPES.MAKEADMIN,
        payload
    }),
    deleteResource: payload => ({
        type: ACTION_TYPES.DELETERESOURCE,
        payload
    }),
    createResource: payload => ({
        type: ACTION_TYPES.CREATERESOURCE,
        payload
    })
};

export default actions;

