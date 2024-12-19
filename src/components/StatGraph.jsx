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
    
    @media (max-width: 768px) {
        padding: 1rem;
    }

    h2 {
        margin-bottom: 1rem;
        text-align: center;
    }
`;

const ChartWrapper = styled.div`
    position: relative;
    height: 40vh;
    width: 100%;
    
    @media (max-width: 768px) {
        height: 50vh;
    }
`;

const StatsGraph = ({ stats }) => {
    const processedData = useMemo(() => {
        const platformGroups = stats.reduce((acc, stat) => {
            if (!acc[stat.platform]) {
                acc[stat.platform] = [];
            }
            acc[stat.platform].push(stat);
            return acc;
        }, {});

        return Object.entries(platformGroups).map(([platform, platformStats]) => {
            const userGroups = platformStats.reduce((acc, stat) => {
                if (!acc[stat.username]) {
                    acc[stat.username] = [];
                }
                acc[stat.username].push(stat);
                return acc;
            }, {});

            const dates = [...new Set(platformStats.map(stat => stat.date))].sort();

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
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    boxWidth: 20,
                    padding: 10
                }
            },
            title: {
                display: true,
                text: 'Problem Solving Progress'
            }
        },
        scales: {
            x: {
                ticks: {
                    maxRotation: 45,
                    minRotation: 45
                }
            }
        }
    };

    return (
        <>
            {processedData.map(({ platform, data }) => (
                <GraphContainer key={platform}>
                    <h2>{platform.toUpperCase()}</h2>
                    <ChartWrapper>
                        <Line options={options} data={data} />
                    </ChartWrapper>
                </GraphContainer>
            ))}
        </>
    );
};

export default StatsGraph;