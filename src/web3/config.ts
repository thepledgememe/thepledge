import { http, createConfig } from "wagmi";
import { injected } from "wagmi/connectors";
import { mainnet, sepolia } from "wagmi/chains";

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

export const appConfig = {
  [mainnet.id]: {
    tokenAddress: "0x910812c44ed2a3b611e4b051d9d83a88d652e2dd",
  },
  [sepolia.id]: {
    tokenAddress: "0x37538D1201486e11f5A06779168a30bA9D683a12",
  },
};
