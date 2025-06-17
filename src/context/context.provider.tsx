import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  ReactNode,
} from "react";
import {
  useAccount,
  useChainId,
  useBalance,
  useConnect,
  useWriteContract,
  useReadContract,
  useChains,
} from "wagmi";
import { appConfig } from "../web3/config";
import BigNumber from "bignumber.js";
import { pledgeAbi } from "../web3/abi";
import { PledgersService } from "../services/PledgersService";
import { Pledger, PledgerCount, TotalPledged } from "../interface/Pledger";
import supabaseClient from "../services/supabase";
import { groupPledgerCountsByGranularity } from "../helpers/charts";

type PledgersData = {
  isFetchingPledgers: boolean;
  pledgers: Pledger[];
  fetchPledgers: ({
    filters,
    pledgersListPage,
    limit,
    sort,
  }: {
    filters?: Record<string, any>;
    pledgersListPage?: number;
    limit?: number;
    sort?: { key: string; direction: "asc" | "desc" } | undefined;
  }) => Promise<void>;
  pledgersListPage: number;
  pledgersFilters: { key?: string; status?: string };
  totalPledgersCount: number;
};

type AppContextType = {
  isInjectorInstalled: boolean;
  isLoading: boolean;
  connectWallet: () => void;
  balance: BigNumber | null;
  pledgedAmount: BigNumber | null;
  totalPledge: BigNumber | null;
  pledgeAvailableToSell: BigNumber | null;
  pledgeTokens: () => Promise<boolean>;
  pledgeWindow: number;
  availableToPLedge: BigNumber;
  isPledgeBroken: boolean;
  tokenAddress: string;
  fetchPledgerCounts: () => Promise<void>;
  pledgerCounts: PledgerCount[];
  fetchTotalPledgedHistory: () => Promise<void>;
  totalPledgedHistory: TotalPledged[];
  pledgersData: PledgersData;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const { connectors, connect, connectAsync, isPending } = useConnect();
  const [pledgerCounts, setPledgerCounts] = useState<PledgerCount[]>([]);
  const [totalPledgedHistory, setTotalPledgedHistory] = useState<TotalPledged[]>([]);
  const [isInjectorInstalled, setIsInjectorInstalled] = useState(false);
  const { address, isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const chainId = useChainId();
  const chains = useChains();

  // Fetching pledger data state
  const [pledgers, setPledgers] = useState<Pledger[]>([]);
  const [pledgersFilters, setPledgerFilters] = useState<{
    key?: string;
    status?: string;
  }>({});
  const [pledgersListPage, setPledgersListPage] = useState(1);
  const [totalPledgersCount, setTotalPledgersCount] = useState(0);
  const [isFetchingPledgers, setIsFetchingPledgers] = useState(false);

  const pledgersService = useMemo(
    () => new PledgersService(supabaseClient),
    [],
  );

  const fetchPledgers = useCallback(
    async ({
      filters,
      pledgersListPage,
      limit,
      sort,
    }: {
      filters: Record<string, any>;
      pledgersListPage?: number;
      limit: number;
      sort?: { key: string; direction: "asc" | "desc" } | undefined;
    }) => {
      limit = limit || 10;
      pledgersListPage = pledgersListPage || 1;
      filters = filters || {};
      setIsFetchingPledgers(true);
      try {
        const filersSafe = JSON.parse(JSON.stringify(filters));
        const params: any = {
          ...filersSafe,
          limit,
          offset: (pledgersListPage - 1) * limit,
          sort,
        };
        const response = await pledgersService.fetchPledgers(params);
        setTotalPledgersCount(response.total);
        setPledgers(response.data);
        setPledgerFilters(filersSafe);
        setPledgersListPage(pledgersListPage);
      } catch (error) {
        console.error("Failed to fetch pledgers:", error.message);
      } finally {
        setIsFetchingPledgers(false);
      }
    },
    [pledgersService],
  );

  const fetchPledgerCounts = useCallback(async () => {
    setIsFetchingPledgers(true);
    try {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setMonth(endDate.getMonth() - 3);

      const formattedStartDate = `${startDate.getFullYear()}-${(startDate.getMonth() + 1).toString().padStart(2, "0")}-${startDate.getDate().toString().padStart(2, "0")}`;
      const formattedEndDate = `${endDate.getFullYear()}-${(endDate.getMonth() + 1).toString().padStart(2, "0")}-${endDate.getDate().toString().padStart(2, "0")}`;

      const response = await pledgersService.getPledgerCounts(
        formattedStartDate,
        formattedEndDate,
      );
      const groupedData = groupPledgerCountsByGranularity(response, "daily");
      setPledgerCounts(groupedData);
    } catch (error) {
      console.error("Failed to fetch pledger counts:", error);
    } finally {
      setIsFetchingPledgers(false);
    }
  }, [pledgersService]);

  const fetchTotalPledgedHistory = useCallback(async () => {
    setIsFetchingPledgers(true);
    try {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setMonth(endDate.getMonth() - 3);

      const response = await pledgersService.getTotalPledged(startDate, endDate);
      const groupedData = groupPledgerCountsByGranularity(
        response.map(item => ({
          id: item.id,
          count: item.total, // Use total as count for grouping function
          updatedAt: item.updatedAt
        })),
        "daily"
      );
      // Convert back to TotalPledged format
      const totalPledgedData = groupedData.map(item => ({
        id: item.id,
        total: item.count, // Convert back from count to total
        updatedAt: item.updatedAt
      }));
      setTotalPledgedHistory(totalPledgedData);
    } catch (error) {
      console.error("Failed to fetch total pledged history:", error);
    } finally {
      setIsFetchingPledgers(false);
    }
  }, [pledgersService]);

  // Existing logic for token operations and balance
  const tokenAddress =
    chainId && chainId in appConfig
      ? appConfig[chainId]?.tokenAddress
      : undefined;

  const { data: tokenBalance } = useBalance({
    address,
    token: tokenAddress,
  });

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setIsInjectorInstalled(true);
    }
  }, []);

  const connectWallet = () => {
    const injectedConnector = connectors.find(
      (connector) => connector.id === "injected",
    );
    if (injectedConnector) {
      connect({ connector: injectedConnector });
    } else {
      alert("MetaMask not detected. Please install MetaMask to connect.");
    }
  };

  const pledgeTokens = useCallback(async () => {
    if (!isConnected) {
      await connectAsync();
    }
    const txResult = await writeContractAsync({
      address: tokenAddress,
      abi: pledgeAbi,
      account: address,
      chain: chains.find((ch) => ch.id === chainId),
      functionName: "pledge",
    });
    console.log(txResult);
    return true;
  }, [isConnected, connect, tokenAddress, pledgeAbi, address, chainId]);

  const { data: pledgedAmountRow, error: pledgedAmountError } = useReadContract(
    {
      address: tokenAddress,
      abi: pledgeAbi,
      account: address,
      functionName: "getPledgedBalance",
      args: [address],
      query: {
        enabled: !!address,
      },
    },
  );
  if (pledgedAmountError) {
    console.log("pledgedAmountError: ", pledgedAmountError);
  }

  const { data: pledgeAvailableToSellRow } = useReadContract({
    address: tokenAddress,
    abi: pledgeAbi,
    account: address,
    functionName: "getPledgerData",
    args: [address],
    query: {
      enabled: !!address,
    },
  });

  const balance = tokenBalance
    ? BigNumber(tokenBalance.value.toString()).div(10 ** tokenBalance.decimals)
    : BigNumber(0);

  const pledgedAmount = useMemo(() => {
    if (!pledgedAmountRow) {
      return BigNumber(0);
    }

    return BigNumber(pledgedAmountRow.toString()).div(10 ** 18);
  }, [pledgedAmountRow]);
  const pledgeAvailableToSell = useMemo(() => {
    if (!pledgeAvailableToSellRow || !pledgeAvailableToSellRow[4]) {
      return BigNumber(0);
    }

    return BigNumber(pledgeAvailableToSellRow[4].toString()).div(10 ** 18);
  }, [pledgeAvailableToSellRow]);
  const pledgeWindow = useMemo(() => {
    if (!pledgeAvailableToSellRow || !pledgeAvailableToSellRow[5]) {
      return 0;
    }

    return parseInt(pledgeAvailableToSellRow[5].toString()) * 1000;
  }, [pledgeAvailableToSellRow]);

  const isPledgeBroken = useMemo(() => {
    if (!pledgeAvailableToSellRow || !pledgeAvailableToSellRow[0]) {
      return false;
    }
    return pledgeAvailableToSellRow[0] === 2;
  }, [pledgeAvailableToSellRow]);

  let availableToPLedge = balance.minus(pledgedAmount || 0);
  if (availableToPLedge.isNegative()) {
    availableToPLedge = BigNumber(0);
  }

  const totalPledge = balance;
  return (
    <AppContext.Provider
      value={{
        isLoading: isPending,
        isInjectorInstalled,
        connectWallet,
        balance,
        pledgeTokens,
        pledgeWindow,
        isPledgeBroken,
        pledgedAmount: pledgedAmount,
        totalPledge: totalPledge,
        availableToPLedge,
        pledgeAvailableToSell: pledgeAvailableToSell,
        tokenAddress,
        pledgerCounts,
        fetchPledgerCounts,
        totalPledgedHistory,
        fetchTotalPledgedHistory,
        pledgersData: {
          isFetchingPledgers,
          totalPledgersCount,
          pledgers,
          fetchPledgers,
          pledgersListPage,
          pledgersFilters,
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

//@ts-ignore
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
