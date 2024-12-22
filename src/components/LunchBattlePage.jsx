import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useTheme } from 'styled-components';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import api from '../api/api';
import { debounce } from 'lodash';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title as ChartTitle,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Chart.js 요소들 등록
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ChartTitle,
    Tooltip,
    Legend
);

import { Container, Title, MenuGrid, MenuButton, ClickCount, WinnerDisplay } from '../styles/LunchBattlePageStyles';
const DEBOUNCE_RATE = 500;
const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_DELAY = 3000;

const LunchBattlePage = () => {
    const { teamId } = useParams();
    const [menus, setMenus] = useState([]);
    const [winner, setWinner] = useState(null);
    const [ws, setWs] = useState(null);
    const clickCountRef = useRef({});
    const [clickCounts, setClickCounts] = useState({});
    const theme = useTheme();
    const [wsStatus, setWsStatus] = useState('disconnected');
    const reconnectAttempts = useRef(0);
    const reconnectTimeout = useRef(null);

    const connectWebSocket = useCallback(() => {
        if (reconnectAttempts.current >= MAX_RECONNECT_ATTEMPTS) {
            console.log('Max reconnection attempts reached');
            setWsStatus('failed');
            return;
        }

        const websocket = new WebSocket(`${import.meta.env.VITE_WS_URL}?teamId=${teamId}`);
        
        websocket.onopen = () => {
            console.log('WebSocket Connected');
            setWs(websocket);
            setWsStatus('connected');
            reconnectAttempts.current = 0;
        };

        websocket.onmessage = (event) => {
            console.log('Received message:', event.data);
            try {
                const message = JSON.parse(event.data);
                if (message.type === 'LIKE_UPDATE') {
                    setMenus((prevMenus) => {
                        const updatedMenus = prevMenus.map(menu => ({
                            ...menu,
                            likeCount: message.updates[menu.id] || menu.likeCount
                        }));

                        const maxVotes = Math.max(...updatedMenus.map(menu => menu.likeCount));
                        const winningFood = updatedMenus.find(menu => menu.likeCount === maxVotes);
                        setWinner(winningFood);

                        return updatedMenus;
                    });
                }
            } catch (error) {
                console.error('Error parsing message:', error);
            }
        };

        websocket.onerror = (error) => {
            console.error('WebSocket error:', error);
            setWsStatus('error');
        };

        websocket.onclose = (event) => {
            console.log('WebSocket closed:', event);
            setWs(null);
            setWsStatus('disconnected');

            reconnectAttempts.current += 1;
            reconnectTimeout.current = setTimeout(() => {
                connectWebSocket();
            }, RECONNECT_DELAY);
        };
    }, [teamId]);

    useEffect(() => {
        connectWebSocket();

        return () => {
            if (ws) {
                ws.close();
            }
            if (reconnectTimeout.current) {
                clearTimeout(reconnectTimeout.current);
            }
        };
    }, [connectWebSocket]);

    const handleVote = useCallback((lunchId) => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            const currentCount = clickCountRef.current[lunchId] || 0;
            
            if (currentCount > 0) {
                console.log(`Sending accumulated ${currentCount} votes for food:`, lunchId);
                
                const message = {
                    teamId: Number(teamId),
                    lunchId: Number(lunchId),
                    likeCount: currentCount
                };
                
                try {
                    ws.send(JSON.stringify(message));
                    clickCountRef.current[lunchId] = 0;
                    setClickCounts(prev => ({
                        ...prev,
                        [lunchId]: 0
                    }));
                } catch (error) {
                    console.error('Error sending vote:', error);
                    if (ws.readyState !== WebSocket.OPEN) {
                        connectWebSocket();
                    }
                }
            }
        } else {
            console.warn('WebSocket not connected, attempting to reconnect...');
            connectWebSocket();
        }
    }, [ws, teamId, connectWebSocket]);

    // 각 음식별로 디바운스된 핸들러 생성
    const debouncedHandlers = useRef({});

    const onFoodClick = (lunchId) => {
        clickCountRef.current[lunchId] = (clickCountRef.current[lunchId] || 0) + 1;
        setClickCounts(prev => ({
            ...prev,
            [lunchId]: (prev[lunchId] || 0) + 1
        }));

        // 각 음식별로 디바운스된 핸들러 생성 및 호출
        if (!debouncedHandlers.current[lunchId]) {
            debouncedHandlers.current[lunchId] = debounce((id) => {
                handleVote(id);
            }, DEBOUNCE_RATE);
        }
        
        debouncedHandlers.current[lunchId](lunchId);
    };

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const response = await api.get(`/api/v1/teams/${teamId}/lunches`);
                const data = response.data;
                console.log(data);
                setMenus(data);
                
                if (data.length > 0) {
                    const maxVotes = Math.max(...data.map(menu => menu.likeCount));
                    const winnersCount = data.filter(menu => menu.likeCount === maxVotes).length;
                    
                    if (winnersCount === 1) {
                        const winningFood = data.find(menu => menu.likeCount === maxVotes);
                        setWinner(winningFood);
                    } else {
                        setWinner({ name: '?' });
                    }
                } else {
                    setWinner({ name: '?' });
                }
            } catch (error) {
                console.error('Error fetching menus:', error);
            }
        };

        fetchMenus();
    }, [teamId]);

    // 차트 데이터
    const chartData = {
        labels: menus.map(menu => menu.name),
        datasets: [{
            label: '투표 수',
            data: menus.map(menu => menu.likeCount),
            backgroundColor: theme.colors.primary,
            borderColor: theme.colors.secondary,
            borderWidth: 1
        }]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 250
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1
                }
            }
        }
    };

    return (
        <Container>
            <Title>Lunch Battle!</Title>
            
            {winner && (
                <WinnerDisplay>
                    We'll Eat <span>{winner.name}</span>
                </WinnerDisplay>
            )}

            <MenuGrid>
                {menus.map(menu => (
                    <MenuButton 
                        key={menu.id}
                        onClick={() => onFoodClick(menu.id)}
                    >
                        {menu.name}
                        {clickCounts[menu.id] > 0 && (
                            <ClickCount>+{clickCounts[menu.id]}</ClickCount>
                        )}
                    </MenuButton>
                ))}
            </MenuGrid>

            <ChartContainer>
                <Bar 
                    data={chartData}
                    options={chartOptions}
                />
            </ChartContainer>
        </Container>
    );
};

const ChartContainer = styled.div`
    height: 400px;
    margin-top: 2rem;
    padding: 1rem;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export default LunchBattlePage;