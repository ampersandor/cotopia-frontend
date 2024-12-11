import React from 'react';
import {
    Section,
    WelcomeBox,
    WelcomeTitle,
    TimeText,
} from '../styles/HomeStyles';


const DashboardSection = ({ user, currentTime }) => {
    const formatTime = (date) => {
        return new Intl.DateTimeFormat('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZone: 'Asia/Seoul'
        }).format(date);
    };

    return (
        <Section>
            <WelcomeBox>
                <WelcomeTitle>{user?.username}님, 환영합니다!</WelcomeTitle>
                <TimeText>{formatTime(currentTime)}</TimeText>
            </WelcomeBox>
        </Section>
    );
};

export default DashboardSection; 