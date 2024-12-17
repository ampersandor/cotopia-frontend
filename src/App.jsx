import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import api from './api/api';
import HomePage from './components/HomePage';
import NavigationBar from './components/NavigationBar';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import TeamsPage from './components/TeamsPage';
import AlgorithmPage from './components/AlgorithmPage';
import LunchBattlePage from './components/LunchBattlePage';
import ProfilePage from './components/ProfilePage';
import { checkAuth } from './api/auth';
import TeamPage from './components/TeamPage';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyles';
export const UserContext = createContext();

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useContext(UserContext);
    
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    
    return children;
};

const PublicRoute = ({ children }) => {
    const { isAuthenticated } = useContext(UserContext);
    
    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }
    
    return children;
};

function App() {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        const getProfile = async () => {
            try {
                const response = await checkAuth();
                setIsAuthenticated(response);
                console.log(response);
                if (response) {
                    const userResponse = await api.get('/api/v1/users/me');
                    setUser(userResponse.data);
                    console.log(userResponse.data);
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                setIsAuthenticated(false);
                setUser(null);
            }
        };

        getProfile();

        const handleLogin = () => {
            getProfile();
        };

        window.addEventListener('login', handleLogin);

        return () => {
            window.removeEventListener('login', handleLogin);
            clearInterval(timer);
        };
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <UserContext.Provider value={{ user, isAuthenticated, currentTime, setUser, setIsAuthenticated }}>
                <Router>
                    <NavigationBar />
                    <Routes>
                        {/* 공개 라우트 */}
                        <Route path="/" element={<HomePage />} />
                        <Route 
                            path="/login" 
                            element={
                                <PublicRoute>
                                    <LoginPage />
                                </PublicRoute>
                            } 
                        />
                        <Route 
                            path="/register" 
                            element={
                                <PublicRoute>
                                    <RegisterPage />
                                </PublicRoute>
                            } 
                        />

                        {/* 보호된 라우트 */}
                        <Route 
                            path="/teams" 
                            element={
                                <ProtectedRoute>
                                    <TeamsPage />
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            path="/teams/:teamId/algorithm" 
                            element={
                                <ProtectedRoute>
                                    <AlgorithmPage  />
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            path="/teams/:teamId/lunchbattle" 
                            element={
                                <ProtectedRoute>
                                    <LunchBattlePage />
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            path="/profile" 
                            element={
                                <ProtectedRoute>
                                    <ProfilePage />
                                </ProtectedRoute>
                            } 
                        />
                        <Route path="/teams/:teamId" element={<ProtectedRoute> <TeamPage /> </ProtectedRoute>} />
                    </Routes>
                </Router>
            </UserContext.Provider>
        </ThemeProvider>
    );
}

export default App;