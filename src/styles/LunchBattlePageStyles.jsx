import styled from 'styled-components';

export const Container = styled.div`
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;

    @media (max-width: 768px) {
        padding: 1rem;
    }
`;

export const Title = styled.h1`
    color: ${props => props.theme.colors.text};
    text-align: center;
    margin-bottom: 2rem;
`;

export const MenuGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
`;

export const MenuButton = styled.button`
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.text};
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }

    &:active {
        transform: translateY(0);
    }
`;

export const FoodImage = styled.img`
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
`;

export const FoodName = styled.span`
    font-size: 1.1rem;
    font-weight: 500;
    text-align: center;
    color: ${props => props.theme.colors.text};
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