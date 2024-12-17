import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const BannerContainer = styled.div`
    background: ${props => props.theme.colors.background};
    border-radius: 15px;
    padding: 2rem;
    text-align: center;
    max-width: 600px;
    margin: 2rem auto;
    box-shadow: 3px 3px 10px rgba(0.1, 0.2, 0.2, 0.3);
`;

export const Message = styled.p`
    font-size: 1.2rem;
    color: #ed6c02;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
`;

export const JoinButton = styled(Link)`
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
