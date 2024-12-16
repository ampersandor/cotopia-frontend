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

const NavigationBar = () => {
    const { isAuthenticated, setIsAuthenticated, setUser, user } = useContext(UserContext);

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
                            {user?.teamId && (
                                <NavLink to={`/teams/${user.teamId}`}>My Team</NavLink>
                            )}
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

export default NavigationBar;