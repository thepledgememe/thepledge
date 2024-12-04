import TokenAllocationChart from "../Chart/Chart";
import styles from "./TokenomicsSection.module.css";

const TokenomicsSection: React.FC = () => (
  <section className={styles.tokenomicsSection}>
    <h2>Initial Token Allocation</h2>
    <div className={styles.chart}>
      <div className={styles.chartWrapper}>
        <TokenAllocationChart />
      </div>
    </div>
  </section>
);

export default TokenomicsSection;
