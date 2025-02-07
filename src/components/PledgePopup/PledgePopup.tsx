import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";
import styles from "./Popup.module.css";
import { useAppContext } from "../../context/context.provider";
import LoadingSpinner from "../LoadingSpinner";
import { useAccount } from "wagmi";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const PledgePopup: React.FC<PopupProps> = ({ isOpen, onClose }) => {
  const { availableToPLedge, pledgeTokens } = useAppContext();
  const { address, isConnected } = useAccount();
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
      if (onClose) {
        onClose();
      }
    } finally {
      setIsConfirming(false);
    }
  }, [pledgeTokens, onClose]);

  if (!isOpen) return null;

  if (isConfirming) {
    return (
      <div className={styles.popup}>
        <div className={styles.popupContent}>
          <LoadingSpinner />
          <p>Please Wait...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        <p className={styles.text}>
          YOU ARE ADDING {availableToPLedge.dp(0).toString()} TO YOUR PLEDGE
        </p>
        {/*<input
          type="text"
          placeholder="Add your twitter handle here..."
          className={styles.twitterInput}
        />*/}
        <button
          className={styles.confirmButton}
          disabled={isConfirming || availableToPLedge.isZero()}
          onClick={confirmPledge}
        >
          CONFIRM
        </button>
        {isConnected && (
          <p className={styles.connectedAddress}>
            You are connected with{" "}
            <span>{`${address.slice(0, 6)}...${address.slice(-4)}`}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default PledgePopup;
