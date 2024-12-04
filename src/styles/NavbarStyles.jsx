import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Nav = styled.nav`
  background-color: #f0f0f0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.5);
  padding: 1rem 4rem;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

export const NavContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #6366f1;
  text-decoration: none;
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 3rem;
  align-items: center;
`;

export const NavLink = styled(Link)`
  color: #1e293b;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.2rem;
  transition: color 0.2s;

  &:hover {
    color: #6366f1;
  }
`;

export const NavButton = styled(Link)`
  padding: 0.5rem 1rem;
  background-color: #6366f1;
  color: white;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.2rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #4f46e5;
  }
`;