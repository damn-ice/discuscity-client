import React, { useContext, useState } from 'react';
import useGet from '../useGet';

const url = 'http://localhost:8000/api'

const homeUrl = url.split('/api')[0];

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

    const value = {
        user,
        setUser,
        setCookie,
        url,
        homeUrl,
        cookie
    }

    return (
        <UserContext.Provider value={value}>
            { children }
        </UserContext.Provider>
    )
}

export default UserProvider
