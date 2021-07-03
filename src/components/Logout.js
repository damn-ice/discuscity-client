import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import { Button } from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import { useUser } from '../context/UserProvider';

const Logout = () => {

    const cookie = localStorage.getItem('discuscity-token');

    const history = useHistory();

    !cookie && history.push('/')

    const { url, setUser } = useUser();

    const confirmLogout = async (e, val) => {
        if (val) {
            setUser(null)
            await fetch(`${url}/logout`, {
                credentials: 'include',
                method: 'GET'
            })
            localStorage.removeItem('discuscity-token');
            history.push('/')
        } else {
            history.goBack()
        }
    }
    return (
        <div className='center'>
            <h2>Are you sure you want to logout?</h2>
            <div className='confirm-logout'>
                <Button variant="contained" onClick={(e) => confirmLogout(e, true)} color="primary" endIcon={<SentimentVeryDissatisfiedIcon />}>
                        YES
                </Button> 
                <Button variant="contained" onClick={(e) => confirmLogout(e, false)} color="secondary" endIcon={<InsertEmoticonIcon />}>
                        NO
                </Button> 
            </div>
        </div>
    )
}

export default Logout
