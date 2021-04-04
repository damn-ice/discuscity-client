import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useState } from 'react';
import { Link } from 'react-router-dom';


const Section = ({ section, active, listRoot }) => {

    const endPoints = ['home', 'politics', 'romance', 'business', 'importation', 'joel'];

    const currentSession = window.location.pathname.split('/')[1]

    const [selectedIndex, setSelectedIndex] = useState(() => {
        if (!currentSession) {
            const home = endPoints.indexOf('home');
            return home;
        } else {
            const session = endPoints.indexOf(currentSession)
            return session;
        }
    });

    const handleSelect = (event, index) => {
        setSelectedIndex(index);
    }

    const capitalize = word => word[0].toUpperCase() + word.slice(1)


    return (
        <div className={section}>
            <List  component='nav' aria-label='main section' classes={{ root: listRoot }}>
                {
                    endPoints.map((session, index) => (
                                <ListItem component={Link} to={session === 'home'? '/': `/${session}`}  classes={{ selected: active}} divider selected={selectedIndex === index} onClick={(event) => handleSelect(event, index)} key={index}>
                                    <ListItemText primary={`${capitalize(session)}`} />
                                </ListItem>)
                    )
                }
            </List>
        </div>
    )
}

export default Section
