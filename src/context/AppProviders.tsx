import { WagmiProvider } from "wagmi";
import { AppProvider } from "./context.provider";
import { config } from "../web3/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface AppProvidersProps {
    children: React.ReactNode;
}

const queryClient = new QueryClient();

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => (
    <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
            <AppProvider>{children}</AppProvider>
        </QueryClientProvider>
    </WagmiProvider>
);