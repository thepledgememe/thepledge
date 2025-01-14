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
  Legend,
);

const DashBoardPage: React.FC = () => {
  const { pledgerCounts, fetchPledgerCounts } = useAppContext();

  useEffect(() => {
    fetchPledgerCounts();
  }, [fetchPledgerCounts]);

  const chartData = {
    labels: pledgerCounts.map((count) => {
      const date = new Date(count.updatedAt);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    }),
    datasets: [
      {
        label: "Pledger Counts",
        data: pledgerCounts.map((count) => Number(count.count)), // Convert count to number
        fill: false,
        borderColor: "#002E5D",
        backgroundColor: "#002E5D",
        pointBackgroundColor: (context: any) =>
          context.dataIndex === pledgerCounts.length - 1
            ? "#FFD700"
            : "#002E5D", // Highlight last point
        pointRadius: (context: any) =>
          context.dataIndex === pledgerCounts.length - 1 ? 8 : 4,
        tension: 0.2, // Smoother curve
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      datalabels: {
        display: true,
        align: "top",
        color: "#555",
      },
    },
    scales: {
      x: {
        type: "category",
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Count",
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
            <h2 className={dashboardStyles.chartTitle}>
              Share of Tokens Pledged
            </h2>
            <div className={dashboardStyles.chartContainer}>
              <Line data={chartData} options={chartOptions} />
            </div>
          </section>
          <section className={dashboardStyles.section}>
            <h2 className={dashboardStyles.sectionHeader}>
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
