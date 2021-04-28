import './App.css';
import Navbar from './components/Navbar';
import DashBoard from './components/DashBoard';
import Footer from './components/Footer';
import {BrowserRouter as Router} from 'react-router-dom';
import UserProvider from './context/UserProvider';


// useeffect to get the user object...
// put it inside the user provider
// if user is null return ... else send request to get user...
// if req.status is 400 return else set user....
// useContext so everyone can have access to the user data...
// Put a TopicProvider here as well so we can enable search functionality from navbar...
function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <DashBoard />
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;


// npx json-server --watch data/db.json --port 7000