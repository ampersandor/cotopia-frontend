import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useTheme } from 'styled-components';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
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

const Container = styled.div`
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
`;

const Title = styled.h1`
    color: ${props => props.theme.colors.text};
    text-align: center;
    margin-bottom: 2rem;
`;

const MenuGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
`;

const MenuButton = styled.button`
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.text};
    padding: 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.1rem;
    transition: all 0.2s ease;
    position: relative;

    &:hover {
        background-color: ${props => props.theme.colors.primaryDark};
        transform: translateY(-2px);
    }

    &:active {
        transform: translateY(0);
    }
`;

const WinnerDisplay = styled.div`
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 2rem;
    padding: 1rem;
    background-color: ${props => props.theme.colors.background};
    border-radius: 8px;
    
    span {
        color: ${props => props.theme.colors.secondary};
        font-weight: bold;
    }
`;

const ClickCount = styled.span`
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: ${props => props.theme.colors.secondary};
    color: white;
    border-radius: 50%;
    padding: 2px 6px;
    font-size: 0.8rem;
    min-width: 20px;
    text-align: center;
`;

const DEBOUNCE_RATE = 500; 

const LunchBattlePage = () => {
    const { teamId } = useParams();
    const [menus, setMenus] = useState([]);
    const [winner, setWinner] = useState(null);
    const [ws, setWs] = useState(null);
    const clickCountRef = useRef({});
    const [clickCounts, setClickCounts] = useState({});
    const theme = useTheme();

    useEffect(() => {
        const websocket = new WebSocket('ws://localhost:8080/ws');

        websocket.onopen = () => {
            console.log('WebSocket Connected');
            setWs(websocket);
        };

        websocket.onmessage = (event) => {
            console.log('Received message:', event.data);
            try {
                const data = JSON.parse(event.data);
                setMenus((prevMenus) => {
                    const updatedMenus = prevMenus.map(menu => {
                        if (menu.id === data.foodId) {
                            return {
                                ...menu,
                                likeCount: data.likeCount
                            };
                        }
                        return menu;
                    });
                    const maxVotes = Math.max(...updatedMenus.map(menu => menu.likeCount));
                    const winningFood = updatedMenus.find(menu => 
                        menu.likeCount === maxVotes
                    );
                    setWinner(winningFood);
                    return updatedMenus;
                });
            } catch (error) {
                console.error('Error parsing message:', error);
            }
        };

        websocket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        websocket.onclose = (event) => {
            console.log('WebSocket closed:', event);
            setWs(null);
        };

        return () => {
            if (websocket) {
                websocket.close();
            }
        };
    }, []);

    const handleVote = useCallback((foodId) => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            const currentCount = clickCountRef.current[foodId] || 0;
            
            if (currentCount > 0) {
                console.log(`Sending accumulated ${currentCount} votes for food:`, foodId);
                
                const message = {
                    teamId: Number(teamId),
                    foodId: Number(foodId),
                    likeCount: currentCount
                };
                
                try {
                    ws.send(JSON.stringify(message));
                    clickCountRef.current[foodId] = 0;
                    setClickCounts(prev => ({
                        ...prev,
                        [foodId]: 0
                    }));
                } catch (error) {
                    console.error('Error sending vote:', error);
                }
            }
        } else {
            console.warn('WebSocket not connected');
        }
    }, [ws, teamId]);

    // 각 음식별로 디바운스된 핸들러 생성
    const debouncedHandlers = useRef({});

    const onFoodClick = (foodId) => {
        clickCountRef.current[foodId] = (clickCountRef.current[foodId] || 0) + 1;
        setClickCounts(prev => ({
            ...prev,
            [foodId]: (prev[foodId] || 0) + 1
        }));

        // 각 음식별로 디바운스된 핸들러 생성 및 호출
        if (!debouncedHandlers.current[foodId]) {
            debouncedHandlers.current[foodId] = debounce((id) => {
                handleVote(id);
            }, DEBOUNCE_RATE);
        }
        
        debouncedHandlers.current[foodId](foodId);
    };

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const response = await fetch(`/api/v1/teams/${teamId}/foods`);
                const data = await response.json();
                console.log(data);
                setMenus(data);
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