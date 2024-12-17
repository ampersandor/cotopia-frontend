import styled from 'styled-components';

export const Container = styled.div`
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
`;

export const Title = styled.h1`
    color: ${props => props.theme.colors.text};
    text-align: center;
    margin-bottom: 2rem;
`;

export const MenuGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
`;

export const MenuButton = styled.button`
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.text};
    padding: 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.1rem;
    transition: all 0.2s ease;
    position: relative;

    &:hover {
        background-color: ${props => props.theme.colors.primaryDark};
        transform: translateY(-2px);
    }

    &:active {
        transform: translateY(0);
    }
`;

export const WinnerDisplay = styled.div`
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 2rem;
    padding: 1rem;
    background-color: ${props => props.theme.colors.background};
    border-radius: 8px;
    
    span {
        color: ${props => props.theme.colors.secondary};
        font-weight: bold;
    }
`;

export const ClickCount = styled.span`
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: ${props => props.theme.colors.secondary};
    color: white;
    border-radius: 50%;
    padding: 2px 6px;
    font-size: 0.8rem;
    min-width: 20px;
    text-align: center;
`;