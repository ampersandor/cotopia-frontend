import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../App';
import styled from 'styled-components';
import api from '../api/api';
import { FaTimes, FaUsers, FaUserPlus } from 'react-icons/fa';
import teamIllustration from '../assets/team-illustration.svg';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
`;

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
`;

const Title = styled.h2`
    color: #333;
    margin: 0;
`;

const TeamsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
`;

const TeamCard = styled.div`
    background: white;
    border-radius: 10px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    transition: transform 0.2s ease;
    border: ${props => props.$isMyTeam ? '2px solid #F0BB78' : 'none'};
    cursor: pointer;

    &:hover {
        transform: translateY(-5px);
    }
`;

const TeamName = styled.h3`
    color: #333;
    margin: 0;
    font-size: 1.25rem;
`;

const TeamMembers = styled.div`
    color: #666;
    font-size: 0.9rem;
`;

const Button = styled.button`
    padding: 0.5rem 1rem;
    background-color: #6366f1;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }

    &:hover:not(:disabled) {
        background-color: #4f46e5;
    }
`;

const CreateButton = styled(Button)`
    background-color: #6366f1;
`;

const JoinButton = styled(Button)`
    margin-top: auto;
    width: 100%;
`;

const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background: white;
    border-radius: 20px;
    width: 100%;
    max-width: 600px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
    background-color: #f8f9fa;
    padding: 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    border-bottom: 1px solid #eee;
`;

const ModalTitle = styled.h3`
    margin: 0;
    color: #333;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const ModalBody = styled.div`
    padding: 2rem;
    display: flex;
    gap: 2rem;
`;

const ModalForm = styled.form`
    flex: 1;
`;

const ModalIllustration = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #666;
    text-align: center;

    img {
        width: 200px;
        margin-bottom: 1rem;
    }
`;

const FormGroup = styled.div`
    margin-bottom: 1.5rem;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 0.5rem;
    color: #333;
    font-weight: 500;
`;

const Input = styled.input`
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #eee;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.2s;

    &:focus {
        outline: none;
        border-color: #6366f1;
    }
`;

const CloseButton = styled.button`
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #666;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    border-radius: 50%;
    transition: background-color 0.2s;

    &:hover {
        background-color: rgba(0, 0, 0, 0.05);
    }
`;

const LoadingSpinner = styled.div`
    text-align: center;
    padding: 2rem;
    color: #666;
`;

const ErrorMessage = styled.div`
    color: #dc2626;
    padding: 1rem;
    background: #fee2e2;
    border-radius: 4px;
    margin-bottom: 1rem;
`;

const TeamBadge = styled.span`
    background-color: #F0BB78;
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.8rem;
    display: inline-block;
    margin-left: 0.5rem;
`;

const TeamsPage = () => {
    const { user, setUser } = useContext(UserContext);
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [teamName, setTeamName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTeams();
    }, []);

    const fetchTeams = async () => {
        try {
            setLoading(true);
            const response = await api.get('/api/v1/teams');
            setTeams(response.data);
        } catch (error) {
            setError('Failed to fetch teams');
            console.error('Error fetching teams:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTeam = async (e) => {
        e.preventDefault();
        if (!teamName.trim() || user.teamId) return;

        try {
            const response = await api.post('/api/v1/teams', { name: teamName });
            setUser({ ...user, teamId: response.data.id });
            setTeamName('');
            setIsModalOpen(false);
            fetchTeams();
        } catch (error) {
            setError('Failed to create team');
            console.error('Error creating team:', error);
        }
    };

    const handleJoinTeam = async (teamId) => {
        if (user.teamId) return;

        try {
            await api.post(`/api/v1/teams/${teamId}/join`);
            setUser({ ...user, teamId });
            setError(null);
            fetchTeams();
        } catch (error) {
            setError('Failed to join team');
            console.error('Error joining team:', error);
        }
    };

    const handleTeamClick = (teamId) => {
        navigate(`/teams/${teamId}`);
    };

    if (loading) return <LoadingSpinner>Loading...</LoadingSpinner>;

    return (
        <Container>
            <HeaderContainer>
                <Title>Teams</Title>
                {!user.teamId && (
                    <CreateButton onClick={() => setIsModalOpen(true)}>
                        Create Team
                    </CreateButton>
                )}
            </HeaderContainer>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <TeamsGrid>
                {teams.map(team => (
                    <TeamCard 
                        key={team.id} 
                        $isMyTeam={user.teamId === team.id}
                        onClick={() => handleTeamClick(team.id)}
                    >
                        <TeamName>
                            {team.name}
                            {user.teamId === team.id && (
                                <TeamBadge>My Team</TeamBadge>
                            )}
                        </TeamName>
                        <TeamMembers>
                            {team.memberCount || 0} members
                        </TeamMembers>
                        {!user.teamId && (
                            <JoinButton onClick={() => handleJoinTeam(team.id)}>
                                Join Team
                            </JoinButton>
                        )}
                    </TeamCard>
                ))}
            </TeamsGrid>

            {isModalOpen && (
                <Modal onClick={() => setIsModalOpen(false)}>
                    <ModalContent onClick={e => e.stopPropagation()}>
                        <CloseButton onClick={() => setIsModalOpen(false)}>
                            <FaTimes />
                        </CloseButton>
                        
                        <ModalHeader>
                            <ModalTitle>
                                <FaUsers />
                                Create New Team
                            </ModalTitle>
                        </ModalHeader>

                        <ModalBody>
                            <ModalForm onSubmit={handleCreateTeam}>
                                <FormGroup>
                                    <Label>Team Name</Label>
                                    <Input
                                        type="text"
                                        value={teamName}
                                        onChange={(e) => setTeamName(e.target.value)}
                                        placeholder="Enter your team name"
                                        autoFocus
                                    />
                                </FormGroup>
                                <CreateButton 
                                    type="submit" 
                                    disabled={!teamName.trim()}
                                >
                                    <FaUserPlus />
                                    Create Team
                                </CreateButton>
                            </ModalForm>

                            <ModalIllustration>
                                <img 
                                    src={teamIllustration} 
                                    alt="Team Illustration" 
                                />
                                <p>Create a team and start collaborating with others!</p>
                            </ModalIllustration>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            )}
        </Container>
    );
};

export default TeamsPage;