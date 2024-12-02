import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SignupForm from './Signup';
import MemberList from './Members';
import Home from './Home'; // Import the Home component

function App() {
    return (
        <Router>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/members">Members</Link></li>
                </ul>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<SignupForm />} />
                <Route path="/members" element={<MemberList />} />
            </Routes>
        </Router>
    );
}

export default App;