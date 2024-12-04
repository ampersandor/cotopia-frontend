import React from 'react';
import {
    Nav,
    NavContainer,
    Logo,
    NavLinks,
    NavLink,
    NavButton
} from '../styles/NavbarStyles';

const Navbar = () => {
    return (
        <Nav>
            <NavContainer>
                <Logo to="/">Cotopia</Logo>
                <NavLinks>
                    <NavLink to="/algorithm">Algorithm</NavLink>
                    <NavLink to="/lunchbattle">Lunch Battle</NavLink>
                    <NavLink to="/teams">Teams</NavLink>
                    <NavButton to="/login">Login</NavButton>
                </NavLinks>
            </NavContainer>
        </Nav>
    );
};

export default Navbar;