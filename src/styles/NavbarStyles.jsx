import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Nav = styled.nav`
  background-color: #543A14;
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
  color: #FFF0DC;
  text-decoration: none;
  &:hover {
    color: #F0BB78;
  }
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 3rem;
  align-items: center;
`;

export const NavLink = styled(Link)`
  color: #FFF0DC;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.2rem;
  transition: color 0.2s;

  &:hover {
    color: #F0BB78;
  }
`;

export const NavButton = styled(Link)`
  padding: 0.5rem 1rem;
  background-color: #F0BB78;
  color: #444444;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.2rem;
  transition: background-color 0.2s;

  &:hover {
    color: #444444;
    background-color: #FFF0DC;
  }
`;