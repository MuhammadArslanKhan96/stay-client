"use client";
import { getCsrfToken } from "next-auth/react";
import {
  DynamicContextProvider,
  getAuthToken,
  useDynamicContext,
} from "../lib/dynamic";
import { EthereumWalletConnectors } from "../lib/dynamic";
import { validateJWT } from "@/lib/authHelpers";
import { mintNftOnSignin } from "@/lib/mintNft";
import { createUser, getUserByEmail } from "@/util/services/user";
import { toast } from "sonner";

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
        events: {
          onAuthSuccess: async (user) => {
            console.log("onAuthSuccess", user);
            // if (user.user.email) {
            //   const getUser = await getUserByEmail(user.user.email);
            // if (!getUser) {
            //   const newUser = createUser({
            //     email: user.user.email,
            //     name: user.user.name,
            //   });
            // }
            // }
            const minting = mintNftOnSignin(user.primaryWallet);
            toast.promise(minting, {
              loading: "Minting your membership",
              success: "Welcome to Stay Chain",
              error: "Error minting NFT",
            });
          },
        },
      }}
    >
      {children}
    </DynamicContextProvider>
  );
}
