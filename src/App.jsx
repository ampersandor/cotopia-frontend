import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Signup from './components/Signup';
import Algorithm from './components/Algorithm';
import TeamPage from './components/TeamPage';
import TeamsPage from './components/TeamsPage';
import MyPage from './components/MyPage';
import LunchBattlePage from './components/LunchBattlePage';
import GlobalStyles from './styles/GlobalStyles';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const checkAuth = async () => {
        try {
            const response = await axios.get('/api/v1/user/check');
            setIsAuthenticated(response.data.valid);
        } catch (error) {
            setIsAuthenticated(false);
        }
    };

    useEffect(() => {
        checkAuth();
        
        const handleLogin = () => {
            checkAuth();
        };

        window.addEventListener('login', handleLogin);
        
        return () => {
            window.removeEventListener('login', handleLogin);
        };
    }, []);

    return (
        <Router>
            <Navbar />
            <GlobalStyles />
            <Routes>
                <Route path="/" element={<HomePage />} />
                {isAuthenticated ? (
                    <>
                        <Route path="/algorithm" element={<Algorithm />} />
                        <Route path="/lunchbattle" element={<LunchBattlePage />} />
                        <Route path="/teams" element={<TeamsPage />} />
                        <Route path="/team" element={<TeamPage />} />
                        <Route path="/mypage" element={<MyPage />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </>
                ) : (
                    <>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="*" element={<Navigate to="/login" />} />
                    </>
                )}
            </Routes>
        </Router>
    );
};

export default App;