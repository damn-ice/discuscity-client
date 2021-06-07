import { Route, Switch} from 'react-router-dom';
import Chat from './Chat';
import Login from './Login';
import Register from './Register';
import Topics from './Topics';


const Content = ({ content }) => {
    return (
        <div className={content}>
            <Switch>
                {/* Refactor the below to be handled along with the Topic */}
                {/* <Route exact path='/' render={() => <h1>Welcome</h1>} /> */}
                <Route path='/login'>
                    <Login />
                </Route>
                <Route path='/register'>
                    <Register/>
                </Route>
                <Route path='/:section/:id'>
                    <Chat />
                </Route>
                <Route path={['/:section', '/']} >
                    <Topics />
                </Route>
                
                <Route render={() => <h1>This Page Doesn't Exist!</h1>} />
            </Switch>
        </div>
    )
}

export default Content
