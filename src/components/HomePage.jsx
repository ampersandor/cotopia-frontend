import React, { useState, useContext } from 'react';
import axios from 'axios';
import { HomeContainer } from '../styles/HomeStyles';
import LandingSection from './LandingSection';
import DashboardSection from './DashboardSection';
import TeamSummary from './TeamSummary';
import NoTeamBanner from './NoTeamBanner';
import WritingAnimation from './WritingAnimation';
import { UserContext } from '../App';

const HomePage = () => {
    const { user, setUser, isAuthenticated, currentTime } = useContext(UserContext);
    return (
        <HomeContainer>
            {!isAuthenticated && <LandingSection />}
            {isAuthenticated && (
                <>
                    <WritingAnimation />
                    <DashboardSection user={user} currentTime={currentTime} />
                    {user?.teamId ? <TeamSummary teamId={user.teamId} /> : <NoTeamBanner />}
                </>
            )}
        </HomeContainer>
    );
};

export default HomePage;