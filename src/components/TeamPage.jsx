import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api';
import styled from 'styled-components';
import { UserContext } from '../App';
import QuickNavigation from './QuickNavigation';
const Container = styled.div`
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;

    @media (max-width: 768px) {
        padding: 1rem;
    }
`;

const TeamHeader = styled.div`
    background: white;
    border-radius: 15px;
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const NavigationRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
`;

const TeamName = styled.h1`
    color: #131010;
    margin-bottom: 1rem;
    font-size: 2.5rem;
`;

const TeamDescription = styled.p`
    color: grey;
    font-size: 1.1rem;
    line-height: 1.6;
`;

const MembersSection = styled.div`
    background: white;
    border-radius: 15px;
    padding: 2rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-top: 1rem;

    h2 {
        color: #131010;
    }
`;

const MembersGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
`;

const MemberCard = styled.div`
    background: #FFF0DC;
    border-radius: 10px;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const MemberInfo = styled.div`
    width: 100%;
    text-align: center;
    
    h3 {
        color: #131010;
        margin: 0;
        font-size: 1rem;
    }
`;

const LeaveButton = styled.button`
    background-color: #fff;
    color: #dc3545;
    border: 2px solid #dc3545;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;

    &:hover {
        background-color: #dc3545;
        color: white;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 1rem;
    margin-left: auto;

    @media (max-width: 768px) {
        margin-left: 0;
        flex-wrap: wrap;
        
        button {
            flex: 1;
            min-width: 120px;
            white-space: nowrap;
        }
    }
`;

const DeleteButton = styled.button`
    background-color: #fff;
    color: #dc3545;
    border: 2px solid #dc3545;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;

    &:hover {
        background-color: #dc3545;
        color: white;
    }
`;

const NoCodingAccountSection = styled.div`
    background: #f8f9fa;
    border-radius: 15px;
    padding: 2rem;
    margin: 1rem 0;
    text-align: center;
    border: 2px dashed #dee2e6;

    h3 {
        color: #131010;
        margin-bottom: 0.5rem;
    }

    p {
        color: #131010;
        margin-bottom: 1rem;
    }
`;

const CreateAccountButton = styled.button`
    background-color: #F0BB78;
    color: #131010;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background-color: #e5a55d;
    }
`;

const GraphTitle = styled.h2`
    color: #131010;
    margin-bottom: 1rem;
`;

const TeamHeaderTop = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    
    @media (max-width: 768px) {
        flex-direction: column;
        align-items: stretch;
    }
`;

const TeamInfo = styled.div`
    flex: 1;
`;

const TeamPage = () => {
    const { teamId } = useParams();
    const navigate = useNavigate();
    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        const fetchTeamDetails = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/api/v1/teams/${teamId}`);
                setTeam(response.data);
            } catch (error) {
                setError('Failed to fetch team details');
                console.error('Error fetching team:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTeamDetails();
    }, [teamId]);

    const handleLeaveTeam = async () => {
        if (window.confirm('Are you sure you want to leave this team?')) {
            try {
                await api.post(`/api/v1/teams/${teamId}/leave`);
                setUser({ ...user, teamId: null });
                navigate('/teams');
            } catch (error) {
                console.error('Error leaving team:', error);
                alert('Failed to leave team');
            }
        }
    };

    const handleDeleteTeam = async () => {
        if (window.confirm('Are you sure you want to delete this team? This action cannot be undone.')) {
            try {
                await api.delete(`/api/v1/teams/${teamId}`);
                setUser({ ...user, teamId: null });
                navigate('/teams');
            } catch (error) {
                console.error('Error deleting team:', error);
                alert('Failed to delete team');
            }
        }
    };

    const handleCreateAccount = () => {
        navigate('/profile');
    };

    if (loading) return (
        <Container>
            <div>Loading...</div>
        </Container>
    );
    
    if (error) return (
        <Container>
            <div>{error}</div>
        </Container>
    );
    
    if (!team) return (
        <Container>
            <div>Team not found</div>
        </Container>
    );

    return (
        <Container>
            <TeamHeader>
                <TeamHeaderTop>
                    <TeamInfo>
                        <TeamName>{team.name}</TeamName>
                        <TeamDescription>
                            Since {new Date(team.createdAt).toLocaleDateString()}
                        </TeamDescription>
                    </TeamInfo>
                    <ButtonContainer>
                        <LeaveButton onClick={handleLeaveTeam}>
                            Leave Team
                        </LeaveButton>
                        {team.leaderId === user?.id && (
                            <DeleteButton onClick={handleDeleteTeam}>
                                Delete Team
                            </DeleteButton>
                        )}
                    </ButtonContainer>
                </TeamHeaderTop>
                <QuickNavigation teamId={teamId}/>
            </TeamHeader>


            {(!user?.codingAccounts || user.codingAccounts.length === 0) && (
                <NoCodingAccountSection>
                    <h3>코딩 계정을 연동하고 팀원들과 함께 성장하세요!</h3>
                    <p>백준, 프로그래머스 등의 계정을 연동하면 팀원들과 함께 문제 풀이 현황을 공유할 수 있습니다.</p>
                    <CreateAccountButton onClick={handleCreateAccount}>
                        코딩 계정 연동하기
                    </CreateAccountButton>
                </NoCodingAccountSection>
            )}

            <MembersSection>
                <h2>Team Members</h2>
                <MembersGrid>
                    {team.members?.map(member => (
                        <MemberCard key={member.id}>
                            <MemberInfo>
                                <h3>{member.username}</h3>
                            </MemberInfo>
                        </MemberCard>
                    ))}
                </MembersGrid>
            </MembersSection>

        </Container>
    );
};

export default TeamPage;
