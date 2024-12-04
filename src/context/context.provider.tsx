import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback, useMemo } from "react";
import { useAccount, useChainId, useBalance, useConnect, useWriteContract, useReadContract } from "wagmi";
import { appConfig } from "../web3/config";
import BigNumber from "bignumber.js";
import { pledgeAbi } from "../web3/abi";

type AppContextType = {
    isInjectorInstalled: boolean;
    isLoading: boolean;
    connectWallet: () => void;
    balance: BigNumber | null;
    pledgedAmount: BigNumber | null;
    totalPledge: BigNumber | null;
    pledgeAvailableToSell: BigNumber | null;
    pledgeTokens: () => Promise<boolean>,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

type AppProviderProps = {
    children: ReactNode;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const { connectors, connect, isPending } = useConnect();
    const [isInjectorInstalled, setIsInjectorInstalled] = useState(false);
    const { address } = useAccount();
    const { writeContractAsync } = useWriteContract()    
    const chainId = useChainId();

    //@ts-ignore
    const tokenAddress = chainId && chainId in appConfig ? appConfig[chainId]?.tokenAddress : undefined;
    const { data: tokenBalance } = useBalance({
        address,
        token: tokenAddress,
    })

    useEffect(() => {
        if (typeof window.ethereum !== "undefined") {
            setIsInjectorInstalled(true);
        }
    }, []);

    const connectWallet = () => {
        const injectedConnector = connectors.find(
            (connector) => connector.id === "injected"
        );
        if (injectedConnector) {
            connect({ connector: injectedConnector });
        } else {
            alert("MetaMask not detected. Please install MetaMask to connect.");
        }
    };

    const pledgeTokens = useCallback(async () => {
        const txResult = await writeContractAsync({
            address: tokenAddress,
            abi: pledgeAbi,
            account: address,
            chain: null,
            functionName: 'pledge'
        });
        console.log(txResult);
        return true;
    }, []);

    const {data: pledgedAmountRow } = useReadContract({        
        address: tokenAddress,
        abi: pledgeAbi,
        account: address,
        functionName: 'getPledgedBalance',
        args: [address],
        query: {
            enabled: !!address,
        }
    });

    const {data: pledgeAvailableToSellRow } = useReadContract({        
        address: tokenAddress,
        abi: pledgeAbi,
        account: address,
        functionName: 'getPledgerData',
        args: [address],
        query: {
            enabled: !!address,
        }
    });

    const balance = tokenBalance ? BigNumber(tokenBalance.value.toString()).div(10 ** tokenBalance.decimals) : BigNumber(0);

    const pledgedAmount = useMemo( () => {
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
    const totalPledge = balance;

    console.log(pledgeAvailableToSellRow);

    return (
        <AppContext.Provider
            value={{
                isLoading: isPending,
                isInjectorInstalled,
                connectWallet,
                balance,
                pledgeTokens,
                pledgedAmount: pledgedAmount,
                totalPledge: totalPledge,
                pledgeAvailableToSell: pledgeAvailableToSell
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
