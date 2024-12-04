import { http, createConfig } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { mainnet, sepolia } from "wagmi/chains";

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    injected(),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})

export const appConfig = {
  [mainnet.id]: {
    tokenAddress: "0xMainnetTokenAddressHere",
  },
  [sepolia.id]: {
    tokenAddress: "0xb0aE7040e2B56935140160684eBC004b1B6D5e89",
  },
};