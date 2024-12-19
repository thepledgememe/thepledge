import React from "react";
import HeroSection from "../components/HeroSection.tsx/HeroSection";
import FAQSection from "../components/FAQSection.tsx/FAQSection";
import TokenomicsSection from "../components/TokenomicsSection/TokenomicsSection";
import PledgersSection from "../components/PledgersSection/PledgersSection";
import Layout from "../components/Layout";
import styles from "../App.module.css";

const HomePage: React.FC = () => {
  return (
    <Layout description="Explore our goals, FAQs, and more on the home page.">
      <HeroSection />
      <FAQSection />
      <TokenomicsSection />
      <PledgersSection />
      <p className={`${styles.textFooter} ${styles.centeredText}`}>
        YOUR WORD IS YOUR BOND
      </p>
    </Layout>
  );
};

export default HomePage;
