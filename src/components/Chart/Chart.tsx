import React, { useEffect, useRef } from "react";
import { Chart, ArcElement, Tooltip, Legend, Title, PieController } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

const chartData = {
  labels: ["Pledged Tokens", "Liquidity Pool"],
  datasets: [
    {
      data: [90, 10],
      backgroundColor: ["#003366", "#cce0ff"],
      borderWidth: 1,
    },
  ],
};

const chartOptions = {
  responsive: true,
  layout: {
    padding: {
      top: 70,
      bottom: 70,
      left: 20,
      right: 20
    }
  },
  plugins: {
    legend: {
      display: false // Disable default legend
    },
    tooltip: {
      enabled: false // Disable default tooltip
    },
    datalabels: {
      color: (context) => {
        const label = context.chart.data.labels[context.dataIndex];
        return label === 'Pledged Tokens' ? '#fff' : '#003366'; // White for Pledged Tokens, Dark Blue for others
      },
      font: {
        weight: 'bold'
      },
      formatter: (_, context) => {
        const label = context.chart.data.labels[context.dataIndex];
        if (label === 'Pledged Tokens') {
          return `90% Pledged Tokens 🤝`;
        } else if (label === 'Liquidity Pool') {
          return `10% Liquidity Pool`;
        }
      },
      anchor: (context) => {
        const label = context.chart.data.labels[context.dataIndex];
        return label === 'Available to Sell' ? 'center' : 'end';
      },
      align: (context) => {
        const label = context.chart.data.labels[context.dataIndex];
        return label === 'Liquidity Pool' ? 'end' : 'end';
      },
      offset: (context) => {
        const label = context.chart.data.labels[context.dataIndex];
        if (label === 'Pledged Tokens') return 20;
        if (label === 'Liquidity Pool') return 40;

        return 60; // Available to Sell
      },
      backgroundColor: (context) => {
        const index = context.dataIndex;
        return context.chart.data.datasets[0].backgroundColor[index];
      },
      padding: {
        top: 8,
        bottom: 8,
        left: 15,
        right: 15
      },
      borderRadius: 15,
      borderWidth: 1,
      borderColor: 'rgba(0, 0, 0, 0.2)', // Simulates a subtle shadow effect

    }
  }
}

const TokenAllocationChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      Chart.register(ArcElement, Tooltip, Legend, Title, PieController, ChartDataLabels);

      chartInstanceRef.current = new Chart(chartRef.current, {
        type: "pie",
        data: chartData,
        //@ts-ignore
        options: chartOptions,
      });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div style={{ width: "100%", height: "300px", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <canvas
        ref={chartRef}
        aria-label="Token allocation chart showing 90% for pledged tokens and 10% for the liquidity pool"
      />
    </div>
  );
};

export default TokenAllocationChart;
