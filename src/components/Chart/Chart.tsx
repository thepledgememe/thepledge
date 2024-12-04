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
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      callbacks: {
        label: (context) => {
          const label = context.label || "";
          const value = context.raw;
          return `${label}: ${value}%`;
        },
      },
    },
    datalabels: {
      formatter: (_, context) => {
        const labels = context.chart.data.labels;
        if (labels && context.dataIndex < labels.length) {
          const label = labels[context.dataIndex];
          return label === "Pledged Tokens" ? "90% Pledged Tokens 🤝" : "10% Liquidity Pool";
        }
        return "";
      },
      color: (context) => {
        const labels = context.chart.data.labels;
        return labels && context.dataIndex < labels.length && labels[context.dataIndex] === "Pledged Tokens" ? "#fff" : "#003366";
      },
    },
    legend: {
      position: "bottom",
    },
  },
};

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
    <div style={{ position: "relative", width: "100%", height: "400px" }}>
      <canvas
        ref={chartRef}
        aria-label="Token allocation chart showing 90% for pledged tokens and 10% for the liquidity pool"
      />
    </div>
  );
};

export default TokenAllocationChart;
