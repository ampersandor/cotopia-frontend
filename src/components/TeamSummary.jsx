import React, { useContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../App';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';


const TeamSummary = ({teamId}) => {
    const { user } = useContext(UserContext);
    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleTeamClick = () => {
        navigate(`/teams/${user.teamId}`);
    };

    if (!user) {
        return <Navigate to="/login" />;
    }

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/api/v1/teams/${teamId}`);
                setTeam(response.data);
                console.log(response.data);
            } catch (error) {
                setError('Failed to fetch team');
                console.error('Error fetching team:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTeam();
    }, [teamId]);

    return (
        <PageContainer>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error}</div>
            ) :
                <>
                    <QuestionSection>
                        <SectionTitle>오늘의 추천 문제</SectionTitle>
                        <QuestionCard>
                            <QuestionTitle>
                                Two Sum
                                <QuestionLink href="https://leetcode.com/problems/two-sum/description/" target="_blank">
                                    문제 풀기
                                </QuestionLink>
                            </QuestionTitle>
                        </QuestionCard>
                    </QuestionSection>
                    <TeamButtonContainer>
                        <TeamButton onClick={handleTeamClick}>
                            Go to My Team
                        </TeamButton>
                    </TeamButtonContainer>
                </>
            } 
        </PageContainer>
    );
};

const PageContainer = styled.div`
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    background: linear-gradient(135deg, #F1cc89 0%, #F0BB78 100%);
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const NoTeamContainer = styled.div`
    text-align: center;
    padding: 4rem 2rem;
    background: #f8f9fa;
    border-radius: 12px;
    max-width: 600px;
    margin: 2rem auto;
`;

const NoTeamTitle = styled.h2`
    font-size: 2rem;
    color: #333;
    margin-bottom: 1rem;
`;

const NoTeamText = styled.p`
    font-size: 1.1rem;
    color: #666;
    margin-bottom: 2rem;
`;

const FindTeamButton = styled.button`
    padding: 1rem 2rem;
    font-size: 1.2rem;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background: #0056b3;
    }
`;

const TeamSection = styled.section`
    margin-bottom: 2rem;
    text-align: center;
`;

const TeamName = styled.h1`
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 1rem;
`;

const MembersList = styled.ul`
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
`;

const MemberItem = styled.li`
    font-size: 1.2rem;
    color: #000000;
`;

const QuestionSection = styled.section`
    margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
    font-size: 1.8rem;
    color: #333;
    margin-bottom: 1rem;
`;

const QuestionCard = styled.div`
    background: #f5f5f5;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const QuestionTitle = styled.h3`
    font-size: 1.4rem;
    color: #333;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const QuestionLink = styled.a`
    color: #007bff;
    text-decoration: none;
    font-size: 1rem;
    &:hover {
        text-decoration: underline;
    }
`;

const ButtonSection = styled.div`
    display: flex;
    gap: 1.5rem;
    margin-top: 2rem;
    justify-content: center;
`;

const NavigateButton = styled.button`
    padding: 1rem 2rem;
    font-size: 1.1rem;
    background: transparent;
    color: #007bff;
    border: 2px solid #007bff;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    
    &:hover {
        color: white;
        background: #007bff;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 123, 255, 0.2);
    }

    &:active {
        transform: translateY(0);
        box-shadow: none;
    }
`;

const TeamButtonContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const TeamButton = styled.button`
    background-color: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.background};
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


export default TeamSummary;
