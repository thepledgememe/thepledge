import React from "react";
import styles from '../App.module.css'
import PledgeWidget from "../components/PledgeWidget/PledgeWidget";
import PledgeButton from "../components/PledgeButton/PledgeButton";
import Layout from "../components/Layout";

const PledgePage: React.FC = () => {
    return (
        <Layout
        >
            <div className={styles.containerHome}>
                <PledgeWidget
                    sellingWindow={{ dateRange: '01.12 – 07.12' }}
                />
                <PledgeButton />
                <p className={`${styles.textFooter} ${styles.centeredText}`}>
                    YOUR WORD IS YOUR BOND
                </p>
            </div>
        </Layout>
    );
};

export default PledgePage;
