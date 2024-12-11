import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import QuickNavigation from './QuickNavigation';

const TeamPage = () => {
    return (
        <PageContainer>
            <TeamSection>
                <TeamName>Team Name</TeamName>
                <MembersList>
                    <MemberItem>Member 1</MemberItem>
                    <MemberItem>Member 2</MemberItem>
                    <MemberItem>Member 3</MemberItem>
                </MembersList>
            </TeamSection>

            <QuestionSection>
                <SectionTitle>오늘의 추천 문제</SectionTitle>
                <QuestionCard>
                    <QuestionTitle>
                        Two Sum
                        <QuestionLink href="https://leetcode.com/problems/two-sum/description/" target="_blank">
                            문제 풀기
                        </QuestionLink>
                    </QuestionTitle>
                </QuestionCard>
            </QuestionSection>
        
            <QuickNavigation />
        </PageContainer>
    );
};

const PageContainer = styled.div`
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    background: linear-gradient(135deg, #F1cc89 0%, #F0BB78 100%);
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const NoTeamContainer = styled.div`
    text-align: center;
    padding: 4rem 2rem;
    background: #f8f9fa;
    border-radius: 12px;
    max-width: 600px;
    margin: 2rem auto;
`;

const NoTeamTitle = styled.h2`
    font-size: 2rem;
    color: #333;
    margin-bottom: 1rem;
`;

const NoTeamText = styled.p`
    font-size: 1.1rem;
    color: #666;
    margin-bottom: 2rem;
`;

const FindTeamButton = styled.button`
    padding: 1rem 2rem;
    font-size: 1.2rem;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background: #0056b3;
    }
`;

const TeamSection = styled.section`
    margin-bottom: 2rem;
    text-align: center;
`;

const TeamName = styled.h1`
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 1rem;
`;

const MembersList = styled.ul`
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
`;

const MemberItem = styled.li`
    font-size: 1.2rem;
    color: #666;
`;

const QuestionSection = styled.section`
    margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
    font-size: 1.8rem;
    color: #333;
    margin-bottom: 1rem;
`;

const QuestionCard = styled.div`
    background: #f5f5f5;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const QuestionTitle = styled.h3`
    font-size: 1.4rem;
    color: #333;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const QuestionLink = styled.a`
    color: #007bff;
    text-decoration: none;
    font-size: 1rem;
    &:hover {
        text-decoration: underline;
    }
`;

const ButtonSection = styled.div`
    display: flex;
    gap: 1.5rem;
    margin-top: 2rem;
    justify-content: center;
`;

const NavigateButton = styled.button`
    padding: 1rem 2rem;
    font-size: 1.1rem;
    background: transparent;
    color: #007bff;
    border: 2px solid #007bff;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    
    &:hover {
        color: white;
        background: #007bff;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 123, 255, 0.2);
    }

    &:active {
        transform: translateY(0);
        box-shadow: none;
    }
`;



export default TeamPage;
