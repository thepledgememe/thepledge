import React from "react";
import styles from './HeroSection.module.css'
import PledgeButton from "../PledgeButton/PledgeButton";

const HeroSection: React.FC = () => {
  return (
    <div className={styles.hero} >
      <div>
        <div className={styles.pledgeWrapper}>
          <div className={styles.pledgeTitle}>
            <span>“THE PLEDGE”</span>
          </div>
          <div className={styles.pledgeContent}>
            <div className={styles.pledgeItem}>
              <span className={styles.pledgeNumber}>1</span>
              <p>
                I will not sell more than 1% of my $PLEDGE each month
              </p>
            </div>
            <div className={styles.pledgeItem}>
              <span className={styles.pledgeNumber}>2</span>
              <p>
                I will tweet once a month: "I am upholding the $PLEDGE"
              </p>
            </div>
            <PledgeButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
