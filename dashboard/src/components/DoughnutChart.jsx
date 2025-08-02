import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


export default function DoughnutChart({ holdings }) {
  const generateDynamicColors = (numColors) => {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    const hue = (i * (360 / numColors)) % 360;
    colors.push(`hsl(${hue}, 70%, 60%)`);
  }
  return colors;
  };

  const holdingsChartData = {
    labels: holdings.map(h => h.name),
    datasets: [
      {
        label: 'Current Value',
        data: holdings.map(h => parseFloat((h.avg * h.qty).toFixed(2))),
        backgroundColor: generateDynamicColors(holdings.length),
        hoverOffset: 4,
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels: {
          boxWidth: 20,
          padding: 15,
          font: { size: 12 },
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) { label += ': '; }
            if (context.parsed !== null) {
              label += new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(context.parsed);
            }
            return label;
          }
        }
      }
    }
  };

  return (
    <div className="section">
      <span>
        <p>Holdings Allocation</p>
      </span>
      <div style={{ position: 'relative', height: '400px', width: '100%' }}>
        <Doughnut data={holdingsChartData} options={chartOptions} />
      </div>
    </div>
  );
};