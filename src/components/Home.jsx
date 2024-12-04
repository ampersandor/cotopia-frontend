import React from 'react';
import {
    HomeContainer,
    HeroSection,
    Subtitle,
    CTAButton,
    Section,
    Grid,
    FeatureCard,
    FeatureIcon,
    StatCard,
    SectionTitle,
    CardTitle,
    CardText
} from '../styles/HomeStyles';

const Home = () => {
    return (
        <HomeContainer>
            <HeroSection>
                <h1>Welcome to Cotopia</h1>
                <Subtitle>A vibrant community for developers</Subtitle>
                <CTAButton to="/signup">Join Us</CTAButton>
            </HeroSection>

            <Section>
                <SectionTitle>Why Choose Cotopia?</SectionTitle>
                <Grid>
                    <FeatureCard>
                        <FeatureIcon>💻</FeatureIcon>
                        <CardTitle>Algorithm Tracker</CardTitle>
                        <CardText>Track your progress on platforms like LeetCode and Baekjoon.</CardText>
                    </FeatureCard>
                    <FeatureCard>
                        <FeatureIcon>🍜</FeatureIcon>
                        <CardTitle>Lunch Battle</CardTitle>
                        <CardText>Vote for your favorite lunch menu in real-time battles!</CardText>
                    </FeatureCard>
                    <FeatureCard>
                        <FeatureIcon>👥</FeatureIcon>
                        <CardTitle>Developer Community</CardTitle>
                        <CardText>Connect and grow with fellow developers in a fun environment.</CardText>
                    </FeatureCard>
                </Grid>
            </Section>

            <Section>
                <SectionTitle>Join Our Growing Community</SectionTitle>
                <Grid>
                    <StatCard>
                        <h3>1,000+</h3>
                        <CardText>Lunch Battles</CardText>
                    </StatCard>
                    <StatCard>
                        <h3>500+</h3>
                        <CardText>Active Members</CardText>
                    </StatCard>
                </Grid>
            </Section>
        </HomeContainer>
    );
};

export default Home;