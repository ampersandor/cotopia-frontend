import React, { useEffect, useState, memo } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; // Ensure Chart.js is imported

function seededRandom(seed) {
    let x = Math.sin(seed+48) * 10000;
    return x - Math.floor(x);
}

function getRandomColor(seed) {
    let red = Math.floor(seededRandom(seed) * 256);
    let green = Math.floor(seededRandom(seed + 1) * 256);
    let blue = Math.floor(seededRandom(seed + 2) * 256);

    return `rgba(${red}, ${green}, ${blue}, 1)`;
}

const StatGraph = memo(({ members }) => {
  console.log("rendering StatGraph")
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      console.log("fetchStats called")
      const today = new Date();
      const to = today.toISOString().split('T')[0];

      const weekBefore = new Date();
      weekBefore.setDate(today.getDate() - 7);
      const from = weekBefore.toISOString().split('T')[0];

      try {
        const responses = await Promise.all(
          members.map(member =>
            fetch(`/api/v1/stats/team/${member.teamId}?from=${from}&to=${to}`)
          )
        );
        const dataPromises = responses.map(response => response.json());

        const dataArray = await Promise.all(dataPromises);

        // Check if dataArray is an array and transform for chart.js format
        const labels = [...new Set(dataArray.flatMap(data => data.map(stat => stat.date)))];
        labels.sort((a, b) => new Date(a) - new Date(b));
        const datasets = members.map((member, index) => {
          const values = labels.map(label => {
            const stat = dataArray[index].find(stat => stat.date === label);
            return stat ? stat.totalSolved : 0; // Handle missing stats
          });
          return {
            label: `${member.name}`, // You can customize this label
            data: values,
            borderColor: `${getRandomColor(index)}`, // Different colors for each member
            backgroundColor: `${getRandomColor(index)}`,
          };
        });

        setChartData({
          labels,
          datasets,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    if (members.length > 0) {
      fetchStats();
    }
  }, [members]);

  if (!chartData) return <p>Loading...</p>;

  return <Line data={chartData} />;
});

export default StatGraph;