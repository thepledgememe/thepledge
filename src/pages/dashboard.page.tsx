import React from "react";
import styles from "../App.module.css";
import TokenPledgeLineChart from "../components/LineChart/LineChart";
import PledgeTable from "../components/PledgeTable/PledgeTable";
import TokenAllocationChart from "../components/Chart/Chart";
import dashboardStyles from "./DashBoardPage.module.css";
import Layout from "../components/Layout";

const DashBoardPage: React.FC = () => {
    return (
        <Layout
            description="Explore our goals, FAQs, and more on the home page."
        >
            <div className={styles.App}>
            <div className={dashboardStyles.container}>
                <section className={dashboardStyles.section}>
                    <h2 className={dashboardStyles.sectionHeader}>Dashboard</h2>
                    <div className={dashboardStyles.chartContainer}>
                        <TokenAllocationChart />
                    </div>
                </section>
                <section className={dashboardStyles.section}>
                    <div className={dashboardStyles.chartContainer}>
                        <TokenPledgeLineChart />
                    </div>
                </section>
                <section className={dashboardStyles.section}>
                    <h2 className={dashboardStyles.sectionHeader}>Pledge Details</h2>
                    <PledgeTable />
                </section>
                <p className={dashboardStyles.footerText}>
                    PRICE DOESN’T MATTER, THERE IS ONLY THE PLEDGE
                </p>
            </div>
        </div>
        </Layout>
       
    );
};

export default DashBoardPage;
