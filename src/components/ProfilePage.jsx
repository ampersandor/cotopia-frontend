import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { UserContext } from '../App';
import api from '../api/api';


const ProfilePage = () => {
    const { user, setUser } = useContext(UserContext);
    const [showForm, setShowForm] = useState(false);
    const [newAccount, setNewAccount] = useState({
        platform: 'baekjoon',
        platformId: '',
        url: ''
    });

    const generateUrl = (platform, id) => {
        switch (platform) {
            case 'baekjoon':
                return `https://www.acmicpc.net/user/${id}`;
            case 'programmers':
                return `https://programmers.co.kr/pr/${id}`;
            case 'leetcode':
                return `https://leetcode.com/${id}`;
            default:
                return '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = generateUrl(newAccount.platform, newAccount.platformId);
        try {
            const accountData = {
                ...newAccount,
                url: url
            };
            const response = await api.post('/api/v1/coding-accounts', accountData);
            setUser({
                ...user,
                codingAccounts: [...user.codingAccounts, response.data]
            });
            setShowForm(false);
            setNewAccount({ platform: 'baekjoon', platformId: '', url: '' });
        } catch (error) {
            console.error('Error adding coding account:', error);
            alert('Failed to add coding account');
        }
    };

    const handleDelete = async (accountId) => {
        if (window.confirm('이 계정을 삭제하시겠습니까?')) {
            try {
                await api.delete(`/api/v1/coding-accounts/${accountId}`);
                setUser({
                    ...user,
                    codingAccounts: user.codingAccounts.filter(account => account.id !== accountId)
                });
            } catch (error) {
                console.error('Error deleting coding account:', error);
                alert('Failed to delete coding account');
            }
        }
    };

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
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <InfoTitle>코딩 계정</InfoTitle>
                        <AddAccountButton onClick={() => setShowForm(!showForm)}>
                            {showForm ? '취소' : '계정 추가'}
                        </AddAccountButton>
                    </div>

                    {showForm && (
                        <AccountForm onSubmit={handleSubmit}>
                            <FormGroup>
                                <Select
                                    value={newAccount.platform}
                                    onChange={(e) => setNewAccount({
                                        ...newAccount,
                                        platform: e.target.value
                                    })}
                                >
                                    <option value="baekjoon">백준</option>
                                    <option value="programmers">프로그래머스</option>
                                    <option value="leetcode">LeetCode</option>
                                </Select>
                                <Input
                                    type="text"
                                    placeholder="계정 ID를 입력하세요"
                                    value={newAccount.platformId}
                                    onChange={(e) => setNewAccount({
                                        ...newAccount,
                                        platformId: e.target.value
                                    })}
                                    required
                                />
                                <SubmitButton type="submit">추가</SubmitButton>
                            </FormGroup>
                        </AccountForm>
                    )}

                    <InfoGrid>
                        {user.codingAccounts.map((account, index) => (
                            <AccountItem key={index}>
                                <AccountContent>
                                    <InfoLabel>{account.platform}</InfoLabel>
                                    <InfoValue>
                                        <AccountLink href={account.url} target="_blank">
                                            {account.platformId}
                                        </AccountLink>
                                    </InfoValue>
                                </AccountContent>
                                <DeleteButton 
                                    onClick={() => handleDelete(account.id)}
                                    title="Delete account"
                                >
                                    x
                                </DeleteButton>
                            </AccountItem>
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
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
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


const AddAccountButton = styled.button`
    background-color: #F0BB78;
    color: #131010;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-size: 0.9rem;
    cursor: pointer;
    margin-left: 1rem;
    transition: all 0.2s ease;

    &:hover {
        background-color: #e5a55d;
    }
`;

const AccountForm = styled.form`
    margin-top: 1rem;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 8px;
    display: grid;
    gap: 1rem;
`;

const FormGroup = styled.div`
    display: flex;
    gap: 1rem;
    
    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const Select = styled.select`
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    flex: 1;
    min-width: 100px;
    
    @media (max-width: 768px) {
        width: 100%;
    }
`;

const Input = styled.input`
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    flex: 2;
    
    @media (max-width: 768px) {
        width: 100%;
    }
`;

const SubmitButton = styled.button`
    background-color: #F0BB78;
    color: #131010;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;

    @media (max-width: 768px) {
        width: 100%;
    }

    &:hover {
        background-color: #e5a55d;
    }
`;

const DeleteButton = styled.button`
    background: red;
    border: solid 1px red;
    color: white;
    cursor: pointer;
    padding: 0rem 0.3rem;
    font-size: 1rem;
    transition: all 0.2s ease;
    margin-left: auto;
    line-height: 1;
    border-radius: 100%;
    &:hover {
        color: #bd2130;
    }
`;

const AccountItem = styled(InfoItem)`
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    box-sizing: border-box;
`;

const AccountContent = styled.div`
    flex: 1;
    overflow: hidden;
    
    ${InfoValue} {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

export default ProfilePage; 