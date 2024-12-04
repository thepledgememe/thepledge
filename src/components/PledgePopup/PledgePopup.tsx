import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";
import styles from "./Popup.module.css";
import { useAppContext } from "../../context/context.provider";
import LoadingSpinner from "../LoadingSpinner";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const PledgePopup: React.FC<PopupProps> = ({ isOpen, onClose }) => {
  const { balance, pledgeTokens } = useAppContext();
  const [isConfirming, setIsConfirming] = useState(false);
  const confirmPledge = useCallback(async () => {
    try {
      setIsConfirming(true);
      const result = await pledgeTokens();
      if (!result) {
        toast.error("Failed to executing pledge. Please try again.");
        return;
      }
      toast.success("Pledge confirmed successfully! 🎉");
      onClose && onClose();
    } finally {
      setIsConfirming(false);
    }
  }, []);

  if (!isOpen) return null;

  if (isConfirming) {
    return (
      <div className={styles.popup}>
        <div className={styles.popupContent}>
          <LoadingSpinner />
          <p>Please Wait...</p>
        </div>
      </div>)
  }

  return (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        <p className={styles.text}>YOU ARE ADDING {balance.toString()} TO PLEDGE</p>
        {/*<input
          type="text"
          placeholder="Add your twitter handle here..."
          className={styles.twitterInput}
        />*/}
        <button className={styles.confirmButton} disabled={isConfirming || balance.isZero()}
          onClick={confirmPledge}>CONFIRM</button>
        <p className={styles.connectedAddress}>
          You are connected with <span>0xAbCdEf...1234</span>
        </p>
      </div>
    </div>
  );
};

export default PledgePopup;
