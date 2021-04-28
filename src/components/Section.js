import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserProvider';


const Section = ({ section, active, listRoot }) => {

    // const endPoints = ['home', 'politics', 'romance', 'business', 'importation', 'joel'];

    const { url } = useUser();

    const currentSession = window.location.pathname.split('/')[1].toLowerCase()


    const [ endPoints, setEndPoints] = useState([]);

    const [selectedIndex, setSelectedIndex] = useState();

    useEffect(() => {
        const getEndPoints = async () => {
            const res = await fetch(url)
            const data = await res.json()
            const result = data.map(endPoint => endPoint.name)
            setEndPoints(result)
        }
        getEndPoints()
        
    }, [url])

    useEffect(() => {
        if (!currentSession) {
            const home = endPoints.indexOf('Home');
            setSelectedIndex(home)
        } else {
            const session = endPoints.indexOf(capitalize(currentSession))
            setSelectedIndex(session)
        }
    }, [currentSession, endPoints])

    const handleSelect = (event, index) => {
        setSelectedIndex(index);
    }

    const capitalize = word => word[0].toUpperCase() + word.slice(1)


    return (
        <div className={section}>
            <List  component='nav' aria-label='main section' classes={{ root: listRoot }}>
                {
                    endPoints.map((session, index) => (
                                <ListItem component={Link} to={session === 'Home'? '/': `/${session.toLowerCase()}`}  classes={{ selected: active}} divider selected={selectedIndex === index} onClick={(event) => handleSelect(event, index)} key={index}>
                                    <ListItemText primary={`${capitalize(session)}`} />
                                </ListItem>)
                    )
                }
            </List>
        </div>
    )
}

export default Section
