import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../assets/logo.png";
import { useAppContext } from "../../context/context.provider";
import { useAccount } from "wagmi";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { isInjectorInstalled, isLoading, connectWallet, balance } = useAppContext();
  const { isConnected } = useAccount();
  const goToAbout = () => navigate("/about");
  const goToYourPledge = () => navigate("/your-pledge");
  const goToDashboard = () => navigate("/dashboard");

  const showInstallMetamask = !isInjectorInstalled;
  const showConnect = isInjectorInstalled && !isConnected;
  const showBalance = isConnected;

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="The Pledge Logo" className={styles.logoImage} />
        <span>The Pledge</span>
      </div>
      <nav className={styles.nav}>
        <button
          className={styles.navButton}
          onClick={goToAbout}
          aria-label="Navigate to About Page"
        >
          About
        </button>
        <button
          className={styles.navButton}
          onClick={goToDashboard}
          aria-label="Navigate to Dashboard Page"
        >
          Dashboard
        </button>
        {showInstallMetamask && (
          <span className={styles.connectError}>
            MetaMask not detected.{" "}
            <a
              href="https://metamask.io/download/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Install MetaMask
            </a>
          </span>
        )}
        {showConnect && (
          <button
            className={styles.connectButton}
            onClick={connectWallet}
            aria-label="Connect Wallet"
            disabled={isLoading}
          >
            {isLoading ? "Connecting..." : "Connect to Pledge"}
          </button>
        )}
        {showBalance && (
          <div className={styles.navPledge}>
            <span>{`Balance: ${balance || 0}`}</span>
            <button
              className={styles.pledgeButton}
              onClick={goToYourPledge}
              aria-label="Navigate to Your Pledge Page"
            >
              Your Pledge
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
