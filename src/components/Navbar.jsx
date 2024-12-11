import React, { useState, useEffect } from 'react';
import {
    Nav,
    NavContainer,
    Logo,
    NavLinks,
    NavLink,
    NavButton
} from '../styles/NavbarStyles';
import { logout } from '../api/auth';
import axios from 'axios';

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const checkAuth = async () => {
        try {
            const response = await axios.get('/api/v1/user/check');
            setIsAuthenticated(response.data.valid);
        } catch (error) {
            console.error('Auth check failed:', error);
            setIsAuthenticated(false);
        }
    };

    useEffect(() => {
        checkAuth();

        const handleLogin = () => {
            checkAuth();
        };

        window.addEventListener('login', handleLogin);
        return () => {
            window.removeEventListener('login', handleLogin);
        };
    }, []);

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
                            <NavLink to="/mypage">My Page</NavLink>
                            <NavButton onClick={logout}>Logout</NavButton>
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

export default Navbar;