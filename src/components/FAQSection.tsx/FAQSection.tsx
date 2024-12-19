import React from "react";
import styles from "./FAQSection.module.css";
import CONFIG from "../../config";

const FAQ_DATA = [
  {
    question: "What is the pledge?",
    answer: [
      "The $PLEDGE is a memecoin for people who keep their word.",
      "Our word is our bond, and there is no amount of money that will ever change that.",
      "Don't believe us? Watch $PLEDGE and we will prove it.",
    ],
  },
  {
    question: "How to take the pledge?",
    answer: [
      `Simply by <a href="${CONFIG.LINKS.UNISWAP}" target="_blank">buying</a> $PLEDGE you agree to The Pledge.`,
      "New pledgers tweet “I took the $PLEDGE” to start their Twitter streak, tweeting each month that they continue to uphold it.",
      `They should also enter their pledge <a href="${CONFIG.LINKS.PLEDGE}" target="_blank">here</a> to track their pledge in the smart contract.`,
    ],
  },
  {
    question: "How is The Pledge enforced?",
    answer: [
      "The pledge works on an honor system.",
      "But your pledge is public, and your reputation is at stake.",
      "The Pledge smart contract has no transfer restrictions, but it contains functions to help the community track the status of each wallet’s pledge.",
      "No staking or artificial lockup mechanism can replace a holder base with a mission.",
    ],
  },
  {
    question:
      "What is the base for the 1% sell allowance: current holdings or initial pledged amount?",
    answer: [
      "The 1% applies to your initial pledged amount. At 12% per year, the minimum amount of time to sell your pledge is 8.33 years.",
    ],
  },
  {
    question: "What happens to my allowance if I buy more $PLEDGE?",
    answer: [
      "If you add to your balance, your allowance remains the same until you flag to the smart contract that you have more tokens.",
      "For example: if you own 1M $PLEDGE tokens and your 1% allowance is 10,000 tokens, and then you buy another 1M tokens, your allowance will remain at 10,000 tokens until you repledge in the smart contract. Once you do, the new pledged amount will go up to 2M, and 1% will increase to 20,000.",
      `You can pledge more tokens <a href="${CONFIG.LINKS.PLEDGE}" target="_blank">here.</a>`,
    ],
  },
  {
    question: "Who is behind the Pledge?",
    answer: [
      "The Pledge is a decentralized community token. We have no team or budget. It started with a group of friends who met through Cryptopunks and expanded from there.",
      "We currently have over 30 volunteers and a multi-sig wallet for community funds. We have received over $40K in donations before launch.",
    ],
  },
  {
    question: "What is a Pledger and a Guardian of the Pledge?",
    answer: [
      `A Pledger is someone who takes the Pledge. A Guardian of the Pledge is a Pledger who has pledged at least 1M $PLEDGE tokens. Pledgers gain access to a token-gated Discord, and Guardians have a special closed <a href="${CONFIG.LINKS.DISCORD}" target="_blank">Discord</a> area to hang out.`,
    ],
  },
  {
    question: "Wen Marketing?",
    answer: [
      `We don't shill $PLEDGE but invite friends to take the Pledge with us. We meme, have fun, and lead by example to welcome new members into our community. We keep building fun experiences for $PLEDGE one step at a time, including using all socials, engaging in collaborations, and sharing a <a href="${CONFIG.LINKS.PDF}" target="_blank" rel="noopener noreferrer">whitepaper </a>for the mid-level audience.`,
    ],
  },
  {
    question: "How does $PLEDGE have such a distributed allocation?",
    answer: [
      "The ultra-organic launch utilized an old-school community organizing tactic: personal invitations.",
      "The initial airdrop of 90% of the supply was evenly distributed to 900 holders. The remaining 10% was used to seed a liquidity pool alongside community donations.",
    ],
  },
];

const FAQSection: React.FC = () => {
  return (
    <section className={styles.faqSection}>
      <div className={styles.faq}>
        <h2>FAQ</h2>
        {FAQ_DATA.map((item, index) => (
          <div key={index} className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>{item.question}</h3>
            {item.answer.map((par, idx) => (
              <p
                key={idx}
                className={styles.faqAnswer}
                dangerouslySetInnerHTML={{ __html: par }}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
