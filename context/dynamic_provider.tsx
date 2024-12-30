import { getCsrfToken } from "next-auth/react";
import { DynamicContextProvider, getAuthToken } from "../lib/dynamic";
import { EthereumWalletConnectors } from "../lib/dynamic";

const networks = [
  {
    blockExplorerUrls: ["https://testnet.bscscan.com/"],
    chainId: 97,
    chainName: "BNB TestNet",
    iconUrls: ["https://app.dynamic.xyz/assets/networks/bnb.svg"],
    name: "BNB TestNet",
    nativeCurrency: {
      decimals: 18,
      name: "BNB",
      symbol: "tBNB",
      iconUrl: "https://app.dynamic.xyz/assets/networks/bnb.svg",
    },
    networkId: 97,
    rpcUrls: ["https://rpc.ankr.com/bsc_testnet_chapel"],
    vanityName: "BNB TestNet",
  },
];

export function DynamicProvider({ children }: React.PropsWithChildren) {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID
          ? process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID
          : "",
        walletConnectors: [EthereumWalletConnectors],
        overrides: { evmNetworks: networks },
      }}
    >
      {children}
    </DynamicContextProvider>
  );
}
