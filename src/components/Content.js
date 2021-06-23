import { useState } from 'react';
import { Route, Switch} from 'react-router-dom';
import Chat from './Chat';
import Create from './Create';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';
import Topics from './Topics';
import UserDetails from './UserDetails';
import UserProfile from './UserProfile';


const Content = ({ content }) => {
    const [ profile, setProfile] = useState(null);
    return (
        <div className={content}>
            <Switch>
                {/* Refactor the below to be handled along with the Topic */}
                {/* <Route exact path='/' render={() => <h1>Welcome</h1>} /> */}
                <Route path='/login'>
                    <Login />
                </Route>
                <Route path='/create'>
                    {/* seems this check need to be handled within the component... */}
                    <Create />
                </Route>
                <Route path='/register'>
                    <Register/>
                </Route>
                <Route path='/user'>
                    <UserDetails profile={ profile } />
                </Route>
                <Route path='/profile'>
                    <UserProfile />
                </Route>
                <Route path='/logout'>
                    <Logout />
                </Route>
                <Route path='/:section/:id'>
                    <Chat changeProfile={setProfile} />
                </Route>
                <Route path={['/:section', '/']} >
                    <Topics />
                </Route>
                {/* we need to build logout page... */}
                <Route render={() => <h1>This Page Doesn't Exist!</h1>} />
            </Switch>
        </div>
    )
}

export default Content
