import PledgeButton from "../PledgeButton/PledgeButton";
import styles from "./PledgersSection.module.css";

const PledgersSection: React.FC = () => (
  <>
    <section className={styles.pledgersSection}>
      <h2>Pledgers</h2>
      <p>
        List of those who took the pledge is{" "}
        <a href="/dashboard">
          <b>here</b>
        </a>
        .
      </p>
    </section>
    <PledgeButton />
  </>
);

export default PledgersSection;
