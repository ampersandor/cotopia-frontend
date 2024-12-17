import React, { useContext } from 'react';
import LandingSection from './LandingSection';
import DashboardSection from './DashboardSection';
import NoTeamBanner from './NoTeamBanner';
import WritingAnimation from './WritingAnimation';
import { UserContext } from '../App';
import TeamSummary from './TeamSummary';
import { HomeContainer } from '../styles/HomeStyles';

const HomePage = () => {
    const { user, isAuthenticated, currentTime } = useContext(UserContext);

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