import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HomeContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
`;

export const HeroSection = styled.header`
  text-align: center;
  padding: 60px 20px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  border-radius: 15px;
  margin-bottom: 40px;

  h1 {
    font-size: 3.5rem;
    margin-bottom: 20px;

    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }
`;

export const Subtitle = styled.p`
  color: white;
  font-size: 1.5rem;
  margin-bottom: 30px;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

export const CTAButton = styled(Link)`
  display: inline-block;
  padding: 15px 30px;
  background-color: white;
  color: #6366f1;
  text-decoration: none;
  border-radius: 25px;
  font-weight: bold;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const Section = styled.section`
  padding: 40px 0;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FeatureCard = styled.div`
  padding: 30px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const FeatureIcon = styled.span`
  font-size: 2.5rem;
  margin-bottom: 15px;
  display: block;
`;

export const StatCard = styled.div`
  text-align: center;
  padding: 20px;
  background: #f8fafc;
  border-radius: 10px;

  h3 {
    font-size: 2.5rem;
    color: #6366f1;
    margin-bottom: 10px;
  }
`;

export const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #1e293b;
`;

export const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #334155;
`;

export const CardText = styled.p`
  color: #64748b;
  line-height: 1.6;
`;