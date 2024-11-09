import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SignupForm from './Signup';
import MemberList from './Members';

function App() {
    return (
        <Router>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/members">Members</Link></li>
                </ul>
            </nav>

            <Routes>
                <Route path="/" element={<h1>Welcome to LeetTrack</h1>} />
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/members" element={<MemberList />} />
            </Routes>
        </Router>
    );
}

export default App;