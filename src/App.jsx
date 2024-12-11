import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import HomePage from './components/HomePage';
import Header from './components/Header';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import TeamsPage from './components/TeamsPage';
import AlgorithmPage from './components/AlgorithmPage';
import LunchBattlePage from './components/LunchBattlePage';
import ProfilePage from './components/ProfilePage';
import GlobalStyles from './styles/GlobalStyles';
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

        const checkAuth = async () => {
            try {
                const response = await axios.get('/api/v1/user/check');
                setIsAuthenticated(response.data.valid);
                if (response.data.valid) {
                    const userResponse = await axios.get('/api/v1/user/profile');
                    setUser(userResponse.data);
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                setIsAuthenticated(false);
                setUser(null);
            }
        };

        checkAuth();

        const handleLogin = () => {
            checkAuth();
        };

        window.addEventListener('login', handleLogin);

        return () => {
            window.removeEventListener('login', handleLogin);
            clearInterval(timer);
        };
    }, []);

    return (
        <UserContext.Provider value={{ user, isAuthenticated, currentTime, setUser, setIsAuthenticated }}>
            <Router>
                <GlobalStyles />
                <Header />
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
                        path="/algorithm" 
                        element={
                            <ProtectedRoute>
                                <AlgorithmPage user={user}/>
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/lunchbattle" 
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
                </Routes>
            </Router>
        </UserContext.Provider>
    );
}

export default App;