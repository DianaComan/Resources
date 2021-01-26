import {ACTION_TYPES} from '../actions/profile.actions';

const profileReducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPES.AUTHENTICATE:
            localStorage.setItem('token', action.payload);
            return {...state, isLogged: true};
        case ACTION_TYPES.SIGNUP:
            return {...state};
        case ACTION_TYPES.LOGOUT:
            localStorage.removeItem('token');
            localStorage.removeItem('details');
            localStorage.removeItem('members');
            return {...state, isLogged: false};
        case ACTION_TYPES.GET_SESSION:
            if (localStorage.getItem('token')) {
                return {...state, isLogged: true};
            }
            return {...state, isLogged: false};
        case ACTION_TYPES.CHANGE_PAGE:
            localStorage.setItem('currentPage', action.payload);
            return {...state, currentPage: action.payload};
        case ACTION_TYPES.GET_CURRENT_PAGE:
            return {...state, currentPage: localStorage.getItem('currentPage')};
        case ACTION_TYPES.DETAILS:
            localStorage.setItem('details', action.payload);
            return {...state, details: action.payload};
        case ACTION_TYPES.MEMBERS:
            localStorage.setItem('members', action.payload);
            return {...state, members: action.payload};
        case ACTION_TYPES.RESOURCES:
            localStorage.setItem('resources', action.payload);
            return {...state, resources: action.payload};
        case ACTION_TYPES.USERPROFILE:
            localStorage.setItem('userprofile', action.payload);
            return {...state, userprofile: action.payload};
        case ACTION_TYPES.RESOURCEPROFILE:
            localStorage.setItem('resourceprofile', action.payload);
            return {...state, resourceprofile: action.payload};
        case ACTION_TYPES.RESERVERESOURCE:
            return {...state};
        case ACTION_TYPES.UNRESERVERESOURCE:
            return {...state};
        case ACTION_TYPES.SUBSCRIBE:
            return {...state};
        case ACTION_TYPES.CREATEORGANISATION:
            return {...state};
        case ACTION_TYPES.MAKEADMIN:
            return {...state};
        case ACTION_TYPES.CREATERESOURCE:
            return {...state};
        case ACTION_TYPES.DELETERESOURCE:
            return {...state};    
        default:
            return state;
    }
};

export default profileReducer;
