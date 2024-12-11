import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HomeContainer } from '../styles/HomeStyles';
import LandingSection from './LandingSection';
import DashboardSection from './DashboardSection';
import TeamPage from './TeamPage';
import NoTeamBanner from './NoTeamBanner';
import WritingAnimation from './WritingAnimation';
const HomePage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        const checkAuth = async () => {
            try {
                const response = await axios.get('/api/v1/user/check');
                setIsAuthenticated(response.data.valid);
                if (response.data.valid) {
                    const userResponse = await axios.get('/api/v1/user/profile');
                    setUser(userResponse.data);
                }
            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        checkAuth();
        
        const handleLogin = () => {
            checkAuth();
        };

        window.addEventListener('login', handleLogin);
        
        return () => {
            window.removeEventListener('login', handleLogin);
            clearInterval(timer);
        };
    }, []);

    return (
        <HomeContainer>
            {!isAuthenticated && <LandingSection />}
            {isAuthenticated && (
                <>
                    <WritingAnimation />
                    <DashboardSection user={user} currentTime={currentTime} />
                    {user?.teamId ? <TeamPage /> : <NoTeamBanner />}
                </>
            )}
        </HomeContainer>
    );
};

export default HomePage;