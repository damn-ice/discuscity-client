import './App.css';
import Navbar from './components/Navbar';
import DashBoard from './components/DashBoard';
import Footer from './components/Footer';
import {BrowserRouter as Router} from 'react-router-dom';
import UserProvider from './context/UserProvider';
import FilterProvider from './context/FilterProvider';


/**
 * COMPLETED => 27th June, 2021...
 * */ 

// useeffect to get the user object...
// put it inside the user provider
// if user is null return ... else send request to get user...
// if req.status is 400 return else set user....
// useContext so everyone can have access to the user data...
// Put a TopicProvider here as well so we can enable search functionality from navbar...

// We seriously need to refactor all our fetch requests... 14/5/21

function App() {
  console.log('live')
  return (
    <UserProvider>
      <Router>
        <FilterProvider>
          <Navbar />
          <DashBoard />
        </FilterProvider>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;


// npx json-server --watch data/db.json --port 7000