import React, { useEffect, useState, useMemo, useContext } from 'react';
import { useParams } from 'react-router-dom';
import StatGraph from './StatGraph';
import styled from 'styled-components';
import { UserContext } from '../App';

// Styled Components
const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${props => props.theme.colors.text};
`;

const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.error};
  padding: 1rem;
  background: ${props => props.theme.colors.errorBackground};
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const AlgorithmPage = ({teamId: propTeamId}) => {
    const { teamId: paramTeamId } = useParams();
    const teamId = propTeamId || paramTeamId;
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const memoizedStats = useMemo(() => stats, [stats]);

    const fetchStats = async () => {
        try {
            setLoading(true);
            setError(null);
            const today = new Date().toISOString().split('T')[0];
            const lastweek = new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split('T')[0];
            
            const response = await fetch(`/api/v1/stats/team/${teamId}?from=${lastweek}&to=${today}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setStats(data);
        } catch (error) {
            setError('Failed to load stats. Please try again later.');
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);


    if (loading) return <LoadingSpinner>Loading...</LoadingSpinner>;

    return (
        <Container>
            <Title>코꿀</Title>
            {error && <ErrorMessage>{error}</ErrorMessage>}

            {stats.length > 0 && (
                <div className="graph-container">
                    <StatGraph stats={memoizedStats} />
                </div>
            )}
        </Container>
    );
};

export default AlgorithmPage;