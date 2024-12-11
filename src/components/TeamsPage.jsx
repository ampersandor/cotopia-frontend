import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const TeamsPage = () => {
    const navigate = useNavigate();

    return (
        <PageContainer>
            <Header>
                <Title>Teams</Title>
                <CreateTeamButton>
                    새 팀 만들기
                </CreateTeamButton>
            </Header>

            <TeamsList>
                <TeamCard>
                    <TeamName>알고리즘 마스터</TeamName>
                    <TeamMembers>Members: 3/4</TeamMembers>
                    <JoinButton>팀 참여하기</JoinButton>
                </TeamCard>

                <TeamCard>
                    <TeamName>코딩의 신</TeamName>
                    <TeamMembers>Members: 2/4</TeamMembers>
                    <JoinButton>팀 참여하기</JoinButton>
                </TeamCard>

                <TeamCard>
                    <TeamName>백준 챌린저스</TeamName>
                    <TeamMembers>Members: 4/4</TeamMembers>
                    <JoinButton disabled>팀 가득참</JoinButton>
                </TeamCard>
            </TeamsList>
        </PageContainer>
    );
};

const PageContainer = styled.div`
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
`;

const Title = styled.h1`
    font-size: 2rem;
    color: #333;
`;

const CreateTeamButton = styled.button`
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background: #0056b3;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 123, 255, 0.2);
    }

    &:active {
        transform: translateY(0);
    }
`;

const TeamsList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
`;

const TeamCard = styled.div`
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
`;

const TeamName = styled.h2`
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 0.5rem;
`;

const TeamMembers = styled.p`
    color: #666;
    margin-bottom: 1rem;
`;

const JoinButton = styled.button`
    width: 100%;
    padding: 0.8rem;
    font-size: 1rem;
    background: ${props => props.disabled ? '#e0e0e0' : '#007bff'};
    color: ${props => props.disabled ? '#666' : 'white'};
    border: none;
    border-radius: 6px;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    transition: all 0.3s ease;

    &:hover:not(:disabled) {
        background: #0056b3;
    }
`;

export default TeamsPage;