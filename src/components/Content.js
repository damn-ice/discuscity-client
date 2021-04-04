import { Route, Switch} from 'react-router-dom';
import Chat from './Chat';
import Topics from './Topics';


const Content = ({ content }) => {
    return (
        <div className={content}>
            <Switch>
                <Route exact path='/' render={() => <h1>Welcome</h1>} />
                <Route path='/:section/:id'>
                    <Chat />
                </Route>
                <Route path='/:section' >
                    <Topics />
                </Route>
                    
                {/* <Route exact path='/:topic/:id' >
                    <Chat />
                </Route> */}
                {/* <Route  path='/joel' render={() => <h1>Damn Ice!</h1>} />
                <Route  path='/import' render={() => <h1>Stubborn Girl!</h1>} /> */}
                <Route render={() => <h1>This Page Doesn't Exist!</h1>} />
            </Switch>
        </div>
    )
}

export default Content
