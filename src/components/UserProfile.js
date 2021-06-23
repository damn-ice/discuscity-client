import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useUser } from "../context/UserProvider"
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SendIcon from '@material-ui/icons/Send';
import { Button } from "@material-ui/core";
import HistoryIcon from '@material-ui/icons/History';
import EmailIcon from '@material-ui/icons/Email';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Badge from '@material-ui/core/Badge';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import EditProfile from "./EditProfile";


const UserProfile = ({ profile }) => {
    const { url, user } = useUser();
    const [viewProfile, setViewProfile] = useState(true);
    console.log(profile)
    const history = useHistory();
    // !user && history.push('/login')
    console.log('working')
    console.log(profile)
    const editProfile = (e, value) => {
        setViewProfile(value);
    }
    return (
        <div >
            {viewProfile ? (
            <div className='card form'>
                <div className='center flex'>
                    <div>
                        <Badge badgeContent='15' color="secondary" >
                            <InsertEmoticonIcon fontSize='large'/>
                        </Badge>
                        <p className='name'>Total Likes</p>
                    </div>
                    <div>
                        <label htmlFor='profile-pix'>
                            <img className='pix profile' src="http://localhost:8000/images/joel.jfif" alt="Profile" />
                        </label>
                        <input id='profile-pix' type='file' style={{display: 'none'}}/>
                        <p className="name">Oshiegbu Joel</p>
                    </div>
                    <div>
                        <Badge badgeContent='4' color="secondary">
                            <SentimentVeryDissatisfiedIcon fontSize='large' />
                        </Badge>
                        <p className='name'>Total Dislikes</p>
                    </div>
                </div>
                <div className='m-20'>
                    <p className='profile-details'><AccountCircleIcon fontSize='inherit'/> Username: <span className='name'>ice</span></p>
                    <p className='profile-details'><EmailIcon fontSize='inherit' /> Email: <span className='name'>ice@gmail.com</span></p>
                    <p className='profile-details'><AccessTimeIcon fontSize='inherit'/> Time  registered</p>
                    <p className='profile-details'><HistoryIcon fontSize='inherit'/> Last Seen: today</p>
                    <div className='center'>
                        <Button onClick={(e) => editProfile(e, false)} variant="contained" color="secondary" endIcon={<SendIcon />}>
                                Edit Profile
                        </Button>
                    </div>
                </div>
            </div>
            ): <EditProfile edit={editProfile}/> }
        </div>
    )
}

// http://localhost:8000/images/dollarbag.jpg
// http://localhost:8000/images/joel.jfif
export default UserProfile
