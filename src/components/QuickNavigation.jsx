import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.div`
    max-width: 600px;
    margin: 2rem auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
`;

const NavButton = styled.div`
    background: white;
    border-radius: 15px;
    padding: 2rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
`;

const Icon = styled.div`
    font-size: 3.5rem;
    margin-bottom: 1rem;
`;

const Label = styled.div`
    font-size: 1.2rem;
    font-weight: 600;
    color: #495057;
`;

const QuickNavigation = () => {
    const navigate = useNavigate();

    return (
        <NavContainer>
            <NavButton onClick={() => navigate('/algorithm')}>
                <Icon>📊</Icon>
                <Label>Algorithm</Label>
            </NavButton>
            <NavButton onClick={() => navigate('/lunchbattle')}>
                <Icon>🍱</Icon>
                <Label>Lunch Battle</Label>
            </NavButton>
        </NavContainer>
    );
};

export default QuickNavigation; 