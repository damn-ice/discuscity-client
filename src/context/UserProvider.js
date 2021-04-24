import React, { useContext } from 'react';

const UserContext = React.createContext();

export const useUser = () => {
    return useContext(UserContext);
}

const UserProvider = ({ children }) => {

    // user base data and setter...

    // user total likes and setter ...

    // user total dislikes and setter... 
    

    return (
        <UserContext.Provider value={2}>
            { children }
        </UserContext.Provider>
    )
}

export default UserProvider
