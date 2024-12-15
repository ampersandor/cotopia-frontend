import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const BannerContainer = styled.div`
    background: ${props => props.theme.colors.background};
    border-radius: 15px;
    padding: 2rem;
    text-align: center;
    max-width: 600px;
    margin: 2rem auto;
    box-shadow: 3px 3px 10px rgba(0.1, 0.2, 0.2, 0.3);
`;

const Message = styled.p`
    font-size: 1.2rem;
    color: #ed6c02;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
`;

const JoinButton = styled(Link)`
    background: #ed6c02;
    color: white;
    padding: 0.8rem 2rem;
    border-radius: 25px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.2s ease;
    display: inline-block;

    &:hover {
        background: #c55a02;
        transform: translateY(-2px);
    }
`;

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