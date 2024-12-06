import React, { useRef } from "react";
import styles from "./HexDisplay.module.css"; // Import the CSS Module
import Vector from "../../assets/Vector.svg";
import VectorAnimal from "../../assets/Warstwa_1.svg";
import VectorLines from "../../assets/image 20.svg";
import Eagle from "../../assets/Group 57.svg";
import Tg from "../../assets/tg.svg";
import Twitter from "../../assets/twitter.svg";
import InstagramIcon from "../../assets/instagram.svg";
import DiscordIcon from "../../assets/dicord.svg";
import CONFIG from "../../config";
import { useAppContext } from "../../context/context.provider";

const HexDisplay: React.FC = () => {
  const { tokenAddress } = useAppContext();

  const discordRef = useRef<HTMLButtonElement>(null);
  const telegramRef = useRef<HTMLButtonElement>(null);
  const instagramRef = useRef<HTMLButtonElement>(null);
  const xRef = useRef<HTMLButtonElement>(null);

  const handleClick = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className={styles.hexDisplay}>
      <span className={styles.hexCode}>
        <p>CA: {tokenAddress}</p>
      </span>
      {/*<button title="Vector" className={styles.button}>
        <img src={Vector} alt="Share" className={styles.img} />
      </button>
      <button title="VectorAnimal" className={styles.button}>
        <img src={VectorAnimal} alt="Share" className={styles.img} />
      </button>*/}
      <button
        title="VectorLines"
        className={styles.button}
        onClick={() => handleClick(CONFIG.LINKS.DEX_TOOLS)}
      >
        <img src={VectorLines} alt="Share" className={styles.img} />
      </button>
      <button
        title="Eagles"
        className={styles.button}
        onClick={() => handleClick(CONFIG.LINKS.DEX_SCREENER)}
      >
        <img
          src={Eagle}
          alt="Share"
          className={styles.eagleImg}
          style={{ width: "35px", height: "35px" }}
        />
      </button>
      <button
        title="Tg"
        className={styles.button}
        ref={telegramRef}
        onClick={() => handleClick(CONFIG.LINKS.TELEGRAM)}
      >
        <img src={Tg} alt="Share" className={styles.img} />
      </button>
      <button
        title="Twitter"
        className={styles.button}
        ref={xRef}
        onClick={() => handleClick(CONFIG.LINKS.X)}
      >
        <img src={Twitter} alt="Share" className={styles.img} />
      </button>
      <button
        title="Discord"
        className={styles.button}
        ref={discordRef}
        onClick={() => handleClick(CONFIG.LINKS.DISCORD)}
      >
        <img src={DiscordIcon} alt="Share" className={styles.img} />
      </button>
      <button
        title="Instagram"
        className={styles.button}
        ref={instagramRef}
        onClick={() => handleClick(CONFIG.LINKS.INSTAGRAM)}
      >
        <img src={InstagramIcon} alt="Share" className={styles.img} />
      </button>
    </div>
  );
};

export default HexDisplay;
