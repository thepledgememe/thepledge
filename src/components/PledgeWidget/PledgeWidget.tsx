import React, { useState } from "react";
import styles from "./PledgeWidget.module.css";
import { useAppContext } from "../../context/context.provider";
import PledgePopup from "../PledgePopup/PledgePopup";
import { timeLeftBetweenDates } from "../../helpers/common";

interface PledgeWidgetProps {

}

const PledgeWidget: React.FC<PledgeWidgetProps> = () => {
  const { pledgedAmount, totalPledge, pledgeAvailableToSell, pledgeWindow, isPledgeBroken, availableToPLedge } = useAppContext();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen((prev) => !prev);
  };

  const endDate = new Date(Date.now() + pledgeWindow)
  const left = timeLeftBetweenDates(new Date, endDate);
  return (
    <div className={styles.container}>
      {isPledgeBroken && <p style={{ color: 'red', fontSize: 30 }}>YOU BROKE YOUR PLEDGE GO AWAY!!!</p>}
      <div className={styles.summary}>
        <h1 className={styles.title}>$PLEDGE BALANCE</h1>
        <h1 className={styles.amount}>{totalPledge?.dp(0).toNumber().toLocaleString()}</h1>
      </div>
      <div className={styles.details}>
        <div className={styles.section}>
          <strong className={styles.label}>AMOUNT PLEDGED</strong>
          <p className={styles.value}>{(pledgedAmount?.dp(0).toNumber() || 0).toLocaleString()}</p>
        </div>
        <div className={styles.section}>
          <strong className={styles.label}>UNPLEDGED TOKENS</strong>
          <div>
            <button className={styles.tokenButton} onClick={togglePopup} disabled={availableToPLedge.isZero() || availableToPLedge.isLessThan(1) || isPledgeBroken}>
              <span style={{paddingRight: 20, fontSize: 20, fontWeight: 'bold'}}>{(availableToPLedge.dp(0).toNumber() || 0).toLocaleString()}</span>
              <span className={styles.token}>ADD TO PLEDGE +</span>
            </button>
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.pledgePrice}>
            <strong className={styles.label}>
              $PLEDGE AVAILABLE TO SELL IN THIS WINDOW
            </strong>
          </div>
          <p className={styles.value}>{pledgeAvailableToSell?.dp(0).toNumber().toLocaleString()}</p>
        </div>
        <div className={styles.section}>
          <div className={styles.pledgePrice}>
            <strong className={styles.label}>
              NEW WINDOW OPENS IN
            </strong>
          </div>
          <p className={styles.value}>{left}</p>
        </div>
      </div>
      <PledgePopup
        isOpen={isPopupOpen}
        onClose={togglePopup}
      />
    </div >
  );
};

export default PledgeWidget;
