import React, { useCallback, useEffect, useState } from "react";
import LoadingOverlay from "react-loading-overlay-ts";
import ReactPaginate from "react-paginate";
import { debounce } from "lodash";
import styles from "./PledgeTable.module.css";
import { useAppContext } from "../../context/context.provider";
import {
  STATUS_BROKEN,
  isPledgeActive,
  isPledgeBroken,
} from "../../helpers/pledge-status";

const ITEMS_PER_PAGE = 20;

const PledgeTable: React.FC = () => {
  const {
    pledgersData: {
      isFetchingPledgers,
      pledgers,
      fetchPledgers,
      pledgersListPage,
      pledgersFilters,
      totalPledgersCount,
    },
  } = useAppContext();

  const [searchQuery, setSearchQuery] = useState("");
  const [showBrokenOnly, setShowBrokenOnly] = useState(false);

  const debouncedSearch = useCallback(
    debounce((value) => {
      fetchPledgers({
        pledgersListPage: 1,
        limit: ITEMS_PER_PAGE,
        filters: {
          key: value,
          status: showBrokenOnly ? STATUS_BROKEN : undefined,
        },
      });
    }, 500),
    [showBrokenOnly, fetchPledgers, fetchPledgers],
  );

  // Update searchQuery with debounce
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  useEffect(() => {
    fetchPledgers({
      pledgersListPage: 1,
      limit: ITEMS_PER_PAGE,
      filters: {
        key: searchQuery,
        status: showBrokenOnly ? STATUS_BROKEN : undefined,
      },
    });
  }, [showBrokenOnly]);

  const handlePageChange = ({ selected }: { selected: number }) => {
    fetchPledgers({
      filters: pledgersFilters,
      pledgersListPage: selected + 1,
      limit: ITEMS_PER_PAGE,
    });
  };

  return (
    <LoadingOverlay
      active={isFetchingPledgers}
      spinner
      text="Loading your content..."
      styles={{
        overlay: (base) => ({
          ...base,
          background: "rgba(200, 200, 200, 0.3)", // Semi-transparent white
          transition: "opacity 0.5s ease",
          borderRadius: "40px",
        }),
        spinner: (base) => ({
          ...base,
          width: "50px",
          height: "50px",
        }),
        content: (base) => ({
          ...base,
          fontSize: "16px",
          color: "#555",
        }),
      }}
    >
      <div className={styles.container}>
        <div className={styles.searchInputCont}>
          <span className={styles.searchInputLabel}>FIND PLEDGER</span>
          <input
            type="text"
            placeholder="Search ..."
            value={searchQuery}
            onChange={handleSearchChange}
            className={styles.searchInput}
            aria-label="Search by name, wallet, or twitter"
            disabled={isFetchingPledgers} // Disable during loading
          />
        </div>

        <div className={styles.filterToggle}>
          <label>
            <input
              type="checkbox"
              checked={showBrokenOnly}
              onChange={(e) => setShowBrokenOnly(e.target.checked)}
              disabled={isFetchingPledgers}
            />
            Show Broken Only
          </label>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHeader}>
                <th className={styles.tableHeaderCellSmall}>#</th>
                <th className={styles.tableHeaderCell}>Wallet Address</th>
                <th className={styles.tableHeaderCell}>Name</th>
                <th className={styles.tableHeaderCell}>Twitter Handle</th>
                <th className={styles.tableHeaderCell}>Pledged Tokens</th>
              </tr>
            </thead>
            <tbody>
              {pledgers.map((item, index) => (
                <tr
                  key={index}
                  className={`${styles.tableRow} ${
                    isPledgeBroken(item.status) ? styles.rowBroken : ""
                  } ${isPledgeActive(item.status) ? styles.rowActive : ""}`}
                >
                  <td className={styles.tableCell}>
                    {ITEMS_PER_PAGE * (pledgersListPage - 1) + index + 1}
                  </td>
                  <td className={styles.tableCell}>
                    <a
                      href={`https://etherscan.io/address/${item.wallet}`}
                      target="blank"
                      style={{ color: "rgb(17, 76, 134)" }}
                    >
                      {item.wallet}
                    </a>
                  </td>
                  <td className={styles.tableCell}>{item.name || ""}</td>
                  <td className={styles.tableCell}>
                    {item.twitter && (
                      <a
                        href={`https://x.com/${item.twitter}`}
                        target="blank"
                        style={{ color: "rgb(17, 76, 134)" }}
                      >
                        {`@${item.twitter}`}
                      </a>
                    )}
                  </td>
                  <td
                    className={styles.tableCell}
                    style={{ textAlign: "right" }}
                  >
                    {item.pledged
                      ? parseInt(item.pledged?.toString()).toLocaleString()
                      : ""}
                  </td>
                </tr>
              ))}
              {pledgers.length === 0 && (
                <tr>
                  <td colSpan={5} className={styles.noDataMessage}>
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <ReactPaginate
          pageCount={Math.ceil(totalPledgersCount / ITEMS_PER_PAGE)}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          onPageChange={handlePageChange}
          containerClassName={styles.paginationContainer}
          activeClassName={styles.paginationActive}
          disabledClassName={styles.paginationDisabled}
          nextLabel="Next >"
          previousLabel="< Previous"
          breakLabel="..."
        />
      </div>
    </LoadingOverlay>
  );
};

export default PledgeTable;
