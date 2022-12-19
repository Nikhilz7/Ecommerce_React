import { createContext,  useEffect, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

import { OnAuthStateChangeListener,createUserDocumentFromAuth  } from "../utils/firebase/firebase.utils"

export const UserContext = createContext({
    setCurrentUser: () => null,                                                            
    currentUser: null,
    //null is the default value for context
});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
};

const userReducer = (state, action) => {
    const { type, payload } = action;

    console.log('dispatched');
    console.log(action);
    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            };
        
        default:
            throw new Error(`Unhandled type ${type} in userReducer`);
    }
}

const INITIAL_STATE = {
    currentUser: null,
}

export const UserProvider = ({children}) => {

//    const [currentUser, setCurrentUser] = useState(null); //null is the default value for useState
    const [ { currentUser }, dispatch ] = useReducer( userReducer, INITIAL_STATE );
    console.log(currentUser);
    const setCurrentUser = (user) => {
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user ));
    };

    const value = { currentUser, setCurrentUser };

    // console.log('userprovider called');
    useEffect(()=>{
        const unsubcribe = OnAuthStateChangeListener((user) => {
            if(user) 
            {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });

        return unsubcribe;
    },[]);
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
