import React, {useReducer} from "react";
import MainContext from "./context";
import combineReducer from "../utils/combinedReducers";
import profileReducer from "../reducers/profile.reducer";
import profileFunctions from "../functions/profile.functions";

const AppProvider = props => {
    const initialValue = {
        profile: {
            isLogged: false,
            currentPage: 'home',
            details: null,
            members: null,
            resources: null,
            userprofile: null,
            resourceprofile: null
        }
    };

    const rootReducer = combineReducer({
        profile: profileReducer
    });
    const [state, dispatch] = useReducer(rootReducer, initialValue);

    const myInitialState = {
        ...state,
        profile: {
            ...state.profile,
            ...profileFunctions(dispatch)
        }
    };

    return (
        <MainContext.Provider displayName="Main Context" value={myInitialState}>
            {props.children}
        </MainContext.Provider>
    );
};

export default AppProvider;
