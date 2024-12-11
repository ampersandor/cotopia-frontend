import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const GraphContainer = styled.div`
    background: white;
    border-radius: 15px;
    padding: 2rem;
    margin: 1rem 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const StatsGraph = ({ stats }) => {
    const processedData = useMemo(() => {
        // 플랫폼별로 데이터 그룹화
        const platformGroups = stats.reduce((acc, stat) => {
            if (!acc[stat.platform]) {
                acc[stat.platform] = [];
            }
            acc[stat.platform].push(stat);
            return acc;
        }, {});

        // 각 플랫폼별 차트 데이터 생성
        return Object.entries(platformGroups).map(([platform, platformStats]) => {
            // 날짜별로 그룹화
            const userGroups = platformStats.reduce((acc, stat) => {
                if (!acc[stat.username]) {
                    acc[stat.username] = [];
                }
                acc[stat.username].push(stat);
                return acc;
            }, {});

            // 모든 날짜 추출 및 정렬
            const dates = [...new Set(platformStats.map(stat => stat.date))].sort();

            // 각 사용자별 라인 데이터 생성
            const datasets = Object.entries(userGroups).map(([username, userStats]) => {
                const color = `hsl(${Math.random() * 360}, 70%, 50%)`;
                return {
                    label: username,
                    data: dates.map(date => {
                        const stat = userStats.find(s => s.date === date);
                        return stat ? stat.problemsSolved : null;
                    }),
                    borderColor: color,
                    backgroundColor: color,
                    tension: 0.4
                };
            });

            return {
                platform,
                data: {
                    labels: dates,
                    datasets
                }
            };
        });
    }, [stats]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Problem Solving Progress'
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <>
            {processedData.map(({ platform, data }) => (
                <GraphContainer key={platform}>
                    <h2>{platform.toUpperCase()}</h2>
                    <Line options={options} data={data} />
                </GraphContainer>
            ))}
        </>
    );
};

export default StatsGraph;