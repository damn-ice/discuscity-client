import React, { useContext, useState } from 'react';
import useGet from '../useGet';

const url = 'https://discuscity-joel.herokuapp.com/api'

const homeUrl = url.split('/api')[0];

const UserContext = React.createContext();

export const useUser = () => {
    return useContext(UserContext);
}

const UserProvider = ({ children }) => {


    // user base data and setter...
    const [user, setUser] = useState(null);
    
    const {data} = useGet(`${url}/current`);
    
    // Setting user data only when the below conditions are met...
    data && !user && setUser(data);
    
    const formatDate = date => {
        const dateObj = new Date(date);
        const currentTime = new Date();
        
        if (dateObj.getFullYear() === currentTime.getFullYear()
        && dateObj.getMonth() === currentTime.getMonth()
        && dateObj.getDate() === currentTime.getDate()
        && dateObj.getHours() === currentTime.getHours()
        && dateObj.getMinutes() === currentTime.getMinutes()
        ){
            return 'Now!'
        }else if (dateObj.getFullYear() === currentTime.getFullYear()
        && dateObj.getMonth() === currentTime.getMonth()
        && dateObj.getDate() === currentTime.getDate()
        ){
            return `Today @ ${dateObj.getHours()}:${dateObj.getMinutes() < 10 ? `0${dateObj.getMinutes()}`:`${dateObj.getMinutes()}`}`
        }else if (dateObj.getFullYear() === currentTime.getFullYear()
            && dateObj.getMonth() === currentTime.getMonth()
            && dateObj.getDate() === currentTime.getDate() - 1
            ){
                return `Yesterday @ ${dateObj.getHours()}:${dateObj.getMinutes() < 10 ? `0${dateObj.getMinutes()}`:`${dateObj.getMinutes()}`}`
            }else {
                return `${dateObj.getDate()}/${dateObj.getMonth()+1}/${dateObj.getFullYear()}`
            }        
        }
    const value = {
        user,
        setUser,
        url,
        homeUrl,
        formatDate,
    }

    return (
        <UserContext.Provider value={value}>
            { children }
        </UserContext.Provider>
    )
}

export default UserProvider
