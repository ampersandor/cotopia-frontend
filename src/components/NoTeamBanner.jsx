import React from 'react';
import { BannerContainer, Message, JoinButton } from '../styles/NoTeamBannerStyles';

const NoTeamBanner = () => {
    return (
        <BannerContainer>
            <Message>
                <span role="img" aria-label="thinking">🤔</span>
                아직 소속된 팀이 없네요!
            </Message>
            <JoinButton to="/teams">
                팀 찾아보기 
                <span role="img" aria-label="rocket" style={{ marginLeft: '8px' }}>🚀</span>
            </JoinButton>
        </BannerContainer>
    );
};

export default NoTeamBanner; 