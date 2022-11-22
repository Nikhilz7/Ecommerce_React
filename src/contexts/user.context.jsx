import { createContext, useState, useEffect } from "react";

import { OnAuthStateChangeListener,createUserDocumentFromAuth  } from "../utils/firebase/firebase.utils"

export const UserContext = createContext({
    setCurrentUser: () => null,                                                            
    currentUser: null,
    //null is the default value for context
});

export const UserProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState(null); //null is the default value for useState
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
