import { useHistory } from "react-router-dom";
import { useUser } from "../context/UserProvider"
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import HistoryIcon from '@material-ui/icons/History';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


const UserDetails = ({ profile }) => {

    const { homeUrl, formatDate } = useUser();
    const cookie = localStorage.getItem('discuscity-token')
    const history = useHistory();
    !cookie && history.push({
        pathname: '/login',
        state: {from: '/user'}
    })
    // we need to test cookie and user if one is true both are true...
    // I'm think any cpmponent that requires only users to view should use cookie presence...
    //  and not user which will initially be false until it get backs a result...abs
    // How do i check route history or previous route react router dom....
    return (
        <div className='card form'>
            {
                profile ? <>
                    <div className='center'>
                        <img className='pix profile' src={`${homeUrl}${profile.person.pix}`} alt="Profile" />
                        <p className="name">{profile.person.first_name}</p>
                    </div>
                    <div className='m-20'>
                        <p className='profile-details'><AccountCircleIcon fontSize='inherit' /> Username: <span className='name'>{profile.username}</span></p>
                        <p className='profile-details'><AccessTimeIcon fontSize='inherit'/> Time  registered: {formatDate(profile.person.created)}</p>
                        <p className='profile-details'><HistoryIcon fontSize='inherit'/> Last Seen: {formatDate(profile.last_login)}</p>
                    </div>
                </>:<h2>No Profile Selected!</h2>
            }
        </div>
    )
}

// http://localhost:8000/images/dollarbag.jpg
// http://localhost:8000/images/joel.jfif
export default UserDetails
