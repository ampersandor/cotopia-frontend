import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const MyPage = () => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        teamId: null,
        role: '',
        codingAccounts: []
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/api/v1/user/profile');
                setUser(response.data);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <PageContainer>
            <ProfileSection>
                <ProfileHeader>
                    <UserAvatar>
                        {user.username ? user.username[0].toUpperCase() : '?'}
                    </UserAvatar>
                    <UserName>{user.username}</UserName>
                </ProfileHeader>

                <InfoSection>
                    <InfoTitle>내 정보</InfoTitle>
                    <InfoGrid>
                        <InfoItem>
                            <InfoLabel>이메일</InfoLabel>
                            <InfoValue>{user.email}</InfoValue>
                        </InfoItem>
                        <InfoItem>
                            <InfoLabel>팀 ID</InfoLabel>
                            <InfoValue>{user.teamId || '팀 없음'}</InfoValue>
                        </InfoItem>
                        <InfoItem>
                            <InfoLabel>역할</InfoLabel>
                            <InfoValue>{user.role}</InfoValue>
                        </InfoItem>
                    </InfoGrid>
                </InfoSection>

                <InfoSection>
                    <InfoTitle>코딩 계정</InfoTitle>
                    <InfoGrid>
                        {user.codingAccounts.map((account, index) => (
                            <InfoItem key={index}>
                                <InfoLabel>{account.platform}</InfoLabel>
                                <InfoValue>
                                    <AccountLink href={account.url} target="_blank">
                                        {account.platformId}
                                    </AccountLink>
                                </InfoValue>
                            </InfoItem>
                        ))}
                    </InfoGrid>
                </InfoSection>
            </ProfileSection>
        </PageContainer>
    );
};

const PageContainer = styled.div`
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
`;

const ProfileSection = styled.div`
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ProfileHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 2rem;
`;

const UserAvatar = styled.div`
    width: 80px;
    height: 80px;
    background: #007bff;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: bold;
`;

const UserName = styled.h1`
    font-size: 2rem;
    color: #333;
`;

const InfoSection = styled.div`
    margin-top: 2rem;
`;

const InfoTitle = styled.h2`
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 1rem;
`;

const InfoGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
`;

const InfoItem = styled.div`
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 8px;
`;

const InfoLabel = styled.div`
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 0.5rem;
`;

const InfoValue = styled.div`
    font-size: 1.1rem;
    color: #333;
    font-weight: 500;
`;

const AccountLink = styled.a`
    color: #007bff;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

export default MyPage; 