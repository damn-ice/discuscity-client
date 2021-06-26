import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useUser } from "../context/UserProvider"
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SendIcon from '@material-ui/icons/Send';
import { Button } from "@material-ui/core";
import EmailIcon from '@material-ui/icons/Email';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Badge from '@material-ui/core/Badge';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import EditProfile from "./EditProfile";


const UserProfile = () => {
    const { user, formatDate, homeUrl, url, setUser } = useUser();
    const [viewProfile, setViewProfile] = useState(true);
    const editProfile = (e, value) => {
        setViewProfile(value);
    }
    const cookie = document.cookie.split('=')[1]
    const history = useHistory();
    !cookie && history.push({
        pathname: '/login',
        state: {from: '/profile'}
    })

    const changePix = async (e) => {
        const nameProcessor = imageName => {
            const splitName = imageName.split('.')
            if (splitName.length > 1){
                const extension = splitName.pop()
                return `${splitName.join('.')} ${new Date()}.${extension}`
            }else {
                console.log('No File Extension')
                return null
            }
        }

        const img = e.target.files[0]
        const image = new FormData();
        const imageName = nameProcessor(img.name)
        if (imageName && img.size < 6000000){
            image.append('image', img, imageName)
    
            const req = await fetch(`${url}/image`, {
                method: 'POST',
                headers: {
                    "X-CSRFToken": cookie,
                },
                credentials: 'include',
                body: image,
            })
            if (!req.ok) {
                console.log('Invalid Image Format!')
            }else {
                const res = await req.json()
                setUser(res)
            }
        }else {
            alert('Ensure you\'re uploading a picture with a size of less than 5.5MB')
        }


    }
    return (
        <div >
            { user && (
                viewProfile ? (
                <div className='card form'>
                    <div className='center flex'>
                        <div>
                            <Badge badgeContent={`${user.totalLikes.length}`} color="secondary" >
                                <InsertEmoticonIcon fontSize='large'/>
                            </Badge>
                            <p className='name'>Total Likes</p>
                        </div>
                        <div>
                            <label htmlFor='profile-pix'>
                                <img className='pix profile' src={`${homeUrl}${user.pix}`} alt="Profile" />
                            </label>
                            <input id='profile-pix' onChange={changePix} accept="image/*" type='file' style={{display: 'none'}}/>
                            <p className="name">{`${user.last_name} ${user.first_name}`}</p>
                        </div>
                        <div>
                            <Badge badgeContent={`${user.totalDislikes.length}`} color="secondary">
                                <SentimentVeryDissatisfiedIcon fontSize='large' />
                            </Badge>
                            <p className='name'>Total Dislikes</p>
                        </div>
                    </div>
                    <div className='m-20'>
                        <p className='profile-details'><AccountCircleIcon fontSize='inherit'/> Username: <span className='name'>{`${user.user}`}</span></p>
                        <p className='profile-details'><EmailIcon fontSize='inherit' /> Email: <span className='name'>{`${user.email}`}</span></p>
                        <p className='profile-details'><AccessTimeIcon fontSize='inherit'/> Time  registered: <span className='name'>{`${formatDate(user.created)}`}</span></p>
                        <div className='center'>
                            <Button onClick={(e) => editProfile(e, false)} variant="contained" color="secondary" endIcon={<SendIcon />}>
                                    Edit Profile
                            </Button>
                        </div>
                    </div>
                </div>
                ): <EditProfile edit={editProfile}/> )
            }
        </div>
    )
}

// http://localhost:8000/images/dollarbag.jpg
// http://localhost:8000/images/joel.jfif
export default UserProfile
