import React, { useCallback } from "react";
import styles from "./PledgeButton.module.css";

const PledgeButton: React.FC = () => {

    const onClicked = useCallback(() => {
        window.open('https://app.uniswap.org/', 'blank');
    }, []);

    return (
        <div className={styles.pledgeContainer} onClick={onClicked}>
            <div className={styles.pledgeContainerBox}>
                <button className={styles.pledgeButton}>
                    GET $PLEDGE
                </button>
            </div>
            <div className={styles.pledgeSubtitle}>available on uniswap</div>
        </div>
    );
};

export default PledgeButton;
