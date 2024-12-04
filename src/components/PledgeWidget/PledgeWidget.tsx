import React, { useState } from "react";
import styles from "./PledgeWidget.module.css";
import { useAppContext } from "../../context/context.provider";
import PledgePopup from "../PledgePopup/PledgePopup";

interface PledgeWidgetProps {
    sellingWindow: {
        dateRange: string;
    };
}

const PledgeWidget: React.FC<PledgeWidgetProps> = ({ sellingWindow }) => {
    const { pledgedAmount, totalPledge, pledgeAvailableToSell } = useAppContext();
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const togglePopup = () => {
        setIsPopupOpen((prev) => !prev);
    };

    const availableToPLedge = totalPledge.minus(pledgedAmount || 0);

    return (
    <div className={styles.container}>
      <div className={styles.summary}>
        <h1 className={styles.title}>YOUR $PLEDGE</h1>
        <h1 className={styles.amount}>{totalPledge?.toNumber().toLocaleString()}</h1>
      </div>
      <div className={styles.details}>
        <div className={styles.section}>
          <strong className={styles.label}>AMOUNT $PLEDGED</strong>
          <p className={styles.value}>{(pledgedAmount?.toNumber() || 0).toLocaleString()}</p>
        </div>
        <div className={styles.section}>
          <strong className={styles.label}>AVAILABLE TO $PLEDGE</strong>
          <div>
            {(availableToPLedge.toNumber() || 0).toLocaleString()}
            <button className={styles.tokenButton} onClick={togglePopup} disabled={availableToPLedge.isZero()}>
                <span className={styles.token}>PLEDGE TOKENS</span>
            </button>
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.pledgePrice}>
            <strong className={styles.label}>
              $PLEDGE AVAILABLE TO SELL IN THIS WINDOW
            </strong>
            <small className={styles.smallText}>
              selling date frame {sellingWindow.dateRange}
            </small>
          </div>
          <p className={styles.value}>{pledgeAvailableToSell?.toNumber().toLocaleString()}</p>
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
