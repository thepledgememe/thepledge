import React, { useCallback } from "react";
import styles from "./PledgeButton.module.css";
import CONFIG from "../../config";

const PledgeButton: React.FC = () => {
  const onClicked = useCallback(() => {
    window.open(CONFIG.LINKS.UNISWAP, "_blank");
  }, []);

  return (
    <div className={styles.pledgeContainer} onClick={onClicked}>
      <div className={styles.pledgeContainerBox}>
        <button className={styles.pledgeButton}>GET $PLEDGE</button>
      </div>
      <div className={styles.pledgeSubtitle}>available on uniswap</div>
    </div>
  );
};

export default PledgeButton;
