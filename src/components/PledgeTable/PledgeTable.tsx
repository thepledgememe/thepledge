import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import styles from "./PledgeTable.module.css";

interface PledgeData {
    wallet: string;
    name: string;
    twitter: string;
    pledgedTokens: number;
}

const PledgeTable: React.FC = () => {
    const [data, setData] = useState<PledgeData[]>([]);
    const [filteredData, setFilteredData] = useState<PledgeData[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/pledgers.csv");
                if (!response.ok) throw new Error("Failed to fetch CSV file.");
                const text = await response.text();

                Papa.parse<PledgeData>(text, {
                    complete: (result) => {
                        // @ts-ignore
                        const parsedData = result.data.map((row: string[]) => ({
                            wallet: row[0] || "N/A",
                            name: row[1] || "Anonymous",
                            twitter: row[2] || "N/A",
                            pledgedTokens: +row[3] || 0,
                        }));
                        setData(parsedData);
                        setFilteredData(parsedData);
                        setIsLoading(false);
                    },
                    error: (error) => {
                        console.error("Error parsing CSV:", error);
                        setIsLoading(false);
                    },
                    skipEmptyLines: true,
                });
            } catch (error) {
                console.error("Error fetching CSV:", error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const filtered = data.filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(filtered);
    }, [searchQuery, data]);

    return (
        <div className={styles.container}>
            <div className={styles.searchInputCont}>
                <span className={styles.searchInputLabel}>FIND WALLET ADRESS</span>
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles.searchInput}
                    aria-label="Search by name"
                />
            </div>

            {isLoading ? (
                <p className={styles.loadingMessage}>Loading data...</p>
            ) : (
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr className={styles.tableHeader}>
                                <th className={styles.tableHeaderCell}>Wallet Address</th>
                                <th className={styles.tableHeaderCell}>Name</th>
                                <th className={styles.tableHeaderCell}>Twitter Handle</th>
                                <th className={styles.tableHeaderCell}>Pledged Tokens</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item, index) => (
                                <tr
                                    key={index}
                                    className={`${styles.tableRow} ${item.pledgedTokens < 1000 ? styles.highlight : ""
                                        }`}
                                >
                                    <td className={styles.tableCell}>{item.wallet}</td>
                                    <td className={styles.tableCell}>{item.name}</td>
                                    <td className={styles.tableCell}>{item.twitter}</td>
                                    <td className={styles.tableCell}>{item.pledgedTokens}</td>
                                </tr>
                            ))}
                            {filteredData.length === 0 && (
                                <tr>
                                    <td colSpan={4} className={styles.noDataMessage}>
                                        No results found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PledgeTable;
