import React, { useContext, useState } from 'react';
import useGet from '../useGet';

const url = 'http://localhost:8000/api'

const UserContext = React.createContext();

export const useUser = () => {
    return useContext(UserContext);
}

const UserProvider = ({ children }) => {


    // user base data and setter...
    const [user, setUser] = useState(null);

    const [cookie, setCookie] = useState(() => {
        return document.cookie.split('=')[1]
    })

    const {data} = useGet(`${url}/current`);

    // Setting user data only when the below conditions are met...
    data && !user && setUser(data);

    // user total likes and setter ...

    // user total dislikes and setter... 
    const value = {
        user,
        setUser,
        setCookie,
        url,
        cookie
    }

    return (
        <UserContext.Provider value={value}>
            { children }
        </UserContext.Provider>
    )
}

export default UserProvider
