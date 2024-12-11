import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const wobble = keyframes`
    0% { transform: translateY(-2px) rotate(0deg); }
    25% { transform: translateY(-2px) rotate(-3deg); }
    75% { transform: translateY(-2px) rotate(3deg); }
    100% { transform: translateY(-2px) rotate(0deg); }
`;

export const HomeContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
`;

export const HeroSection = styled.header`
  text-align: center;
  padding: 60px 20px;
  background: linear-gradient(135deg, #F1cc89 0%, #F0BB78 100%);
  color: #543A14;
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
  color: #543A14;
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
    animation: ${wobble} 0.3s ease infinite;
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

export const WelcomeBox = styled.div`
    background: linear-gradient(135deg, #F1cc89 0%, #F0BB78 100%);
    border-radius: 15px;
    padding: 2rem;
    color: #131010;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1200px;  // 최대 너비 설정
    margin-left: auto;  // 가운데 정렬을 위한 마진
    margin-right: auto;
`;

export const WelcomeTitle = styled.h2`
    font-size: 2rem;
    margin-bottom: 1rem;
    font-weight: 600;
    text-align: center;
`;

export const TimeText = styled.p`
    font-size: 2rem;
    opacity: 0.9;
    text-align: center;
`;

export const CardInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
`;

export const InfoRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid #e9ecef;
    
    &:last-child {
        border-bottom: none;
    }
`;

export const InfoLabel = styled.span`
    font-weight: 600;
    color: #6c757d;
`;

export const InfoValue = styled.span`
    color: #495057;
`;