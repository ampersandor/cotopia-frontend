import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <header className="hero-section">
                <h1>Welcome to Cotopia</h1>
                <p className="subtitle">A vibrant community for developers</p>
                <Link to="/register" className="cta-button">Join Us</Link>
            </header>

            <section className="features-section">
                <h2>Why Choose Cotopia?</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <span className="feature-icon">💻</span>
                        <h3>Algorithm Tracker</h3>
                        <p>Track your progress on platforms like LeetCode and Baekjoon.</p>
                    </div>
                    <div className="feature-card">
                        <span className="feature-icon">🍜</span>
                        <h3>Lunch Battle</h3>
                        <p>Vote for your favorite lunch menu in real-time battles!</p>
                    </div>
                    <div className="feature-card">
                        <span className="feature-icon">👥</span>
                        <h3>Developer Community</h3>
                        <p>Connect and grow with fellow developers in a fun environment.</p>
                    </div>
                </div>
            </section>

            <section className="stats-section">
                <h2>Join Our Growing Community</h2>
                <div className="stats-grid">
                    <div className="stat-card">
                        <h3>1,000+</h3>
                        <p>Lunch Battles</p>
                    </div>
                    <div className="stat-card">
                        <h3>500+</h3>
                        <p>Active Members</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;