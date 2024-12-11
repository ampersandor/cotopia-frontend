import React, { useEffect, useState, useMemo } from 'react';
import StatGraph from './StatGraph';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 1rem;
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

const Algorithm = ({user}) => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const memoizedMembers = useMemo(() => members, [members]);

    // 멤버 데이터 fetch
    const fetchMembers = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`/api/v1/members/team/${user.teamId}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setMembers(data);
        } catch (error) {
            setError('Failed to load members. Please try again later.');
            console.error('Error fetching members:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);


    if (loading) return <LoadingSpinner>Loading...</LoadingSpinner>;

    return (
        <Container>
            <Title>Member List</Title>
            {error && <ErrorMessage>{error}</ErrorMessage>}

            {members.length > 0 && (
                <div className="graph-container">
                    <StatGraph members={memoizedMembers} />
                </div>
            )}
        </Container>
    );
};

export default Algorithm;