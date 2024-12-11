import React, { useContext } from 'react';
import {
    Nav,
    NavContainer,
    Logo,
    NavLinks,
    NavLink,
    NavButton
} from '../styles/NavbarStyles';
import { logout } from '../api/auth';
import { UserContext } from '../App';

const Header = () => {
    const { isAuthenticated, setIsAuthenticated, setUser } = useContext(UserContext);

    const handleLogout = async () => {
        await logout();
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <Nav>
            <NavContainer>
                <Logo to="/">Cotopia</Logo>
                <NavLinks>
                    {isAuthenticated ? (
                        <>
                            <NavLink to="/algorithm">Algorithm</NavLink>
                            <NavLink to="/lunchbattle">Lunch Battle</NavLink>
                            <NavLink to="/teams">Teams</NavLink>
                            <NavLink to="/profile">My Page</NavLink>
                            <NavButton onClick={handleLogout}>Logout</NavButton>
                        </>
                    ) : (
                        <>
                            <NavLink to="/teams">Teams</NavLink>
                            <NavButton to="/login">Login</NavButton>
                        </>
                    )}
                </NavLinks>
            </NavContainer>
        </Nav>
    );
};

export default Header;