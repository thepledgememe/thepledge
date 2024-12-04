import React from "react";
import styles from "./FAQSection.module.css";

const FAQ_DATA = [
    {
        question: "What is the pledge?",
        answer: [
            "Our word is our bond, and there is no amount of money that will ever change that.",
            "Don't believe us? Watch $PLEDGE and we will prove it.",
        ]
    },
    {
        question: "How is The Pledge enforced?",
        answer: [
            "There is no contract. Simply by buying $PLEDGE you agree to The Pledge.",
            "But your pledge is public, and your reputation is at stake. No staking or artificial lockup mechanism can replace a holder base with a mission.",
        ]
    },
    {
        question: "What are the tokenomics?",
        answer: ["10% liquidity pool, 90% free claim (evenly distributed)."],
    },
    {
        question: "How to get an allocation?",
        answer: [
            "1. Pledge by tweeting 'I am taking the $PLEDGE', and tag @ThePledgeMeme.",
            "2. Reply to that tweet with your ETH address.",
            "3. Show us you are a real person with a track record of believing in something.",
        ]
    },
    {
        question: "Wen drop?",
        answer: [
            "The claim will open when enough credible accounts take the pledge. It may take us some time to screen applicants.",
        ]
    },
    {
        question: "Wen marketing?",
        answer: [
            "All the marketing we need is this: holders upholding their pledge.",
            "We don't shill $PLEDGE, but we invite frens to take the Pledge with us.",
        ]
    },
];

const FAQSection: React.FC = () => {
    return (
        <section className={styles.faqSection}>
            <div className={styles.faq}>
                <h2>FAQ</h2>
                {FAQ_DATA.map((item, index) => (
                    <div key={index} className={styles.faqItem}>
                        <h3
                            className={styles.faqQuestion}
                        >
                            {item.question}
                        </h3>
                        {item.answer.map(par => <p className={styles.faqAnswer}>{par}</p>)}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQSection;
