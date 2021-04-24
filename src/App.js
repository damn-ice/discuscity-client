import './App.css';
import Navbar from './components/Navbar';
import DashBoard from './components/DashBoard';
import Footer from './components/Footer';
import {BrowserRouter as Router} from 'react-router-dom';

// useeffect to get the user object...
// useContext so anyone can have access to the user data...
function App() {
  return (
    <Router>
      <Navbar />
      <DashBoard />
      <Footer />
    </Router>
  );
}

export default App;


// npx json-server --watch data/db.json --port 7000