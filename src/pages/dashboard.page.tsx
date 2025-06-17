import React, { useEffect } from "react";
import styles from "../App.module.css";
import PledgeTable from "../components/PledgeTable/PledgeTable";
import dashboardStyles from "./DashBoardPage.module.css";
import Layout from "../components/Layout";
import { useAppContext } from "../context/context.provider";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-plugin-datalabels";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashBoardPage: React.FC = () => {
  const { pledgerCounts, fetchPledgerCounts, totalPledgedHistory, fetchTotalPledgedHistory } = useAppContext();

  useEffect(() => {
    fetchPledgerCounts();
    fetchTotalPledgedHistory();
  }, [fetchPledgerCounts, fetchTotalPledgedHistory]);

  // Create unified timeline by merging and sorting all unique dates
  const createUnifiedTimeline = () => {
    const allDates = new Set<string>();
    
    // Add all pledger count dates
    pledgerCounts.forEach(count => {
      const date = new Date(count.updatedAt);
      allDates.add(date.toISOString().split('T')[0]); // YYYY-MM-DD format
    });
    
    // Add all total pledged dates
    totalPledgedHistory.forEach(data => {
      const date = new Date(data.updatedAt);
      allDates.add(date.toISOString().split('T')[0]); // YYYY-MM-DD format
    });
    
    // Sort dates and convert to display format
    return Array.from(allDates)
      .sort()
      .map(dateStr => {
        const date = new Date(dateStr);
        return {
          key: dateStr,
          label: `${date.getMonth() + 1}/${date.getDate()}`
        };
      });
  };

  const unifiedTimeline = createUnifiedTimeline();

  // Create data arrays aligned with unified timeline
  const createAlignedData = () => {
    const pledgerCountData: (number | null)[] = [];
    const totalPledgedData: (number | null)[] = [];
    
    // Create lookup maps for faster access
    const pledgerCountMap = new Map<string, number>();
    pledgerCounts.forEach(count => {
      const dateKey = new Date(count.updatedAt).toISOString().split('T')[0];
      pledgerCountMap.set(dateKey, Number(count.count));
    });
    
    const totalPledgedMap = new Map<string, number>();
    totalPledgedHistory.forEach(data => {
      const dateKey = new Date(data.updatedAt).toISOString().split('T')[0];
      const pledgeValue = Number(data.total) / Math.pow(10, 18);
      const millionValue = Math.round((pledgeValue / 1000000) * 100) / 100;
      totalPledgedMap.set(dateKey, millionValue);
    });
    
    // Fill data arrays based on unified timeline
    unifiedTimeline.forEach(({ key }) => {
      pledgerCountData.push(pledgerCountMap.get(key) || null);
      totalPledgedData.push(totalPledgedMap.get(key) || null);
    });
    
    return { pledgerCountData, totalPledgedData };
  };

  const { pledgerCountData, totalPledgedData } = createAlignedData();

  const combinedChartData = {
    labels: unifiedTimeline.map(item => item.label),
    datasets: [
      {
        label: "Pledger Count",
        data: pledgerCountData,
        fill: false,
        borderColor: "#002E5D",
        backgroundColor: "#002E5D",
        pointBackgroundColor: "#002E5D",
        pointRadius: 4,
        tension: 0.2,
        borderWidth: 2,
        yAxisID: 'y',
        spanGaps: true, // Connect points across null values
      },
      {
        label: "Total Pledged (Millions PLEDGE)",
        data: totalPledgedData,
        fill: false,
        borderColor: "#10B981",
        backgroundColor: "#10B981",
        pointBackgroundColor: "#10B981",
        pointRadius: 4,
        tension: 0.2,
        borderWidth: 2,
        yAxisID: 'y1',
        spanGaps: true, // Connect points across null values
      },
    ],
  };

  const combinedChartOptions = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      datalabels: {
        display: false, // Disable data labels for cleaner dual-axis chart
      },
    },
    scales: {
      x: {
        type: "category" as const,
        display: true,
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: "Pledger Count",
          color: "#002E5D",
        },
        ticks: {
          color: "#002E5D",
          stepSize: 1, // Force integer steps
          callback: function(value: any) {
            if (Number.isInteger(value)) {
              return value;
            }
            return null; // Don't show non-integer values
          }
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: "Total Pledged (Millions PLEDGE)",
          color: "#10B981",
        },
        ticks: {
          color: "#10B981",
        },
        grid: {
          drawOnChartArea: true,
        },
      },
    },
  };


  return (
    <Layout description="Explore our goals, FAQs, and more on the home page.">
      <div className={styles.App}>
        <div className={dashboardStyles.container}>
          {/*<section className={dashboardStyles.section}>
                    <h2 className={dashboardStyles.sectionHeader}>Dashboard</h2>
                    <div className={dashboardStyles.chartContainer}>
                        <TokenAllocationChart />
                    </div>
                </section>
                <section className={dashboardStyles.section}>
                    <div className={dashboardStyles.chartContainer}>
                        <TokenPledgeLineChart />
                    </div>
                </section>*/}
          <section className={dashboardStyles.section}>
            <h2 className={dashboardStyles.chartTitle}>Pledger Metrics</h2>
            <div className={dashboardStyles.chartContainer}>
              <Line data={combinedChartData} options={combinedChartOptions as any} />
            </div>
          </section>
          <section className={dashboardStyles.section}>
            <h2 className={dashboardStyles.chartTitle}>
              Who has taken the pledge?
            </h2>
            <PledgeTable />
          </section>
          <p className={dashboardStyles.footerText}>YOUR WORD IS YOUR BOND</p>
        </div>
      </div>
    </Layout>
  );
};

export default DashBoardPage;
