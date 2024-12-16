import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { HomeContainer } from '../styles/HomeStyles';
import LandingSection from './LandingSection';
import DashboardSection from './DashboardSection';
import NoTeamBanner from './NoTeamBanner';
import WritingAnimation from './WritingAnimation';
import { UserContext } from '../App';
import AlgorithmPage from './AlgorithmPage';
import TeamSummary from './TeamSummary';

const HomePage = () => {
    const { user, setUser, isAuthenticated, currentTime } = useContext(UserContext);
    const navigate = useNavigate();


    return (
        <HomeContainer>
            {!isAuthenticated && <LandingSection />}
            {isAuthenticated && (
                <>
                    <WritingAnimation />
                    <DashboardSection user={user} currentTime={currentTime} />
                    {user?.teamId ? (
                        <>
                            <TeamSummary teamId={user.teamId}/>

                        </>
                    ) : (
                        <NoTeamBanner />
                    )}
                </>
            )}
        </HomeContainer>
    );
};

export default HomePage;