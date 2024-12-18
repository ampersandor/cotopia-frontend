import React, { useState, useContext } from 'react';
import {
    Nav,
    NavContainer,
    Logo,
    NavLinks,
    NavLink,
    NavButton,
    MenuButton
} from '../styles/NavbarStyles';
import { logout } from '../api/auth';
import { UserContext } from '../App';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const NavigationBar = () => {
    const { isAuthenticated, setIsAuthenticated, setUser, user } = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        setIsAuthenticated(false);
        setUser(null);
        setIsOpen(false);
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleNavClick = (path) => {
        setIsOpen(false);
        if (path) navigate(path);
    };

    return (
        <Nav>
            <NavContainer>
                <Logo to="/" onClick={() => setIsOpen(false)}>Cotopia</Logo>
                <MenuButton onClick={toggleMenu}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </MenuButton>
                <NavLinks isOpen={isOpen}>
                    {isAuthenticated ? (
                        <>
                            {user?.teamId && (
                                <NavLink 
                                    onClick={() => handleNavClick(`/teams/${user.teamId}`)}
                                    to={`/teams/${user.teamId}`}
                                >
                                    My Team
                                </NavLink>
                            )}
                            <NavLink 
                                onClick={() => handleNavClick('/teams')}
                                to="/teams"
                            >
                                Teams
                            </NavLink>
                            <NavLink 
                                onClick={() => handleNavClick('/profile')}
                                to="/profile"
                            >
                                My Page
                            </NavLink>
                            <NavButton onClick={handleLogout}>Logout</NavButton>
                        </>
                    ) : (
                        <>
                            <NavLink 
                                onClick={() => handleNavClick('/teams')}
                                to="/teams"
                            >
                                Teams
                            </NavLink>
                            <NavButton 
                                onClick={() => handleNavClick('/login')}
                                to="/login"
                            >
                                Login
                            </NavButton>
                        </>
                    )}
                </NavLinks>
            </NavContainer>
        </Nav>
    );
};

export default NavigationBar;