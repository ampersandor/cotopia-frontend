import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import StatGraph from './StatGraph';
import api from '../api/api';
import { Container, Title, LoadingSpinner, ErrorMessage } from '../styles/AlgorithmPageStyles';


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
            
            const response = await api.get(`/api/v1/stats/team/${teamId}?from=${lastweek}&to=${today}`);
            const data = response.data;
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