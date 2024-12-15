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

const TeamButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
`;

const TeamButton = styled.button`
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.text};
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.2s ease;

    &:hover {
        background-color: ${props => props.theme.colors.primaryDark};
    }
`;

const HomePage = () => {
    const { user, setUser, isAuthenticated, currentTime } = useContext(UserContext);
    const navigate = useNavigate();

    const handleTeamClick = () => {
        navigate(`/teams/${user.teamId}`);
    };

    return (
        <HomeContainer>
            {!isAuthenticated && <LandingSection />}
            {isAuthenticated && (
                <>
                    <WritingAnimation />
                    <DashboardSection user={user} currentTime={currentTime} />
                    {user?.teamId ? (
                        <>
                            <TeamButtonContainer>
                                <TeamButton onClick={handleTeamClick}>
                                    Go to My Team
                                </TeamButton>
                            </TeamButtonContainer>
                            <AlgorithmPage teamId={user.teamId}/>
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