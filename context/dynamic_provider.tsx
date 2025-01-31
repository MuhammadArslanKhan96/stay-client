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
import { string } from "zod";

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
            if (user.user.newUser) {
              const payload: { email: string; username: string; wallet: any } =
                {
                  email: user.user.email ?? "",
                  username: user.user.firstName ?? "",
                  wallet: user.primaryWallet ?? "",
                };
              // const newUser = await createUser(payload);
              const newUser = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/signup`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(payload),
                }
              );
              const minting = mintNftOnSignin(user.primaryWallet);
              toast.promise(minting, {
                loading: "Minting your membership",
                success: "Welcome to Stay Chain",
                error: "Error minting NFT",
              });
            } else {
              toast.success("Welcome back!");
            }

            // if (user.user.email) {
            //   const getUser = await getUserByEmail(user.user.email);
            //   console.log(user.user.email, getUser, "user");
            //   if (!getUser) {
            //     const newUser = createUser({
            //       email: user.user.email,
            //       name: user.user.name,
            //     });
            //   }
            // }
            // const minting = mintNftOnSignin(user.primaryWallet);
            // toast.promise(minting, {
            //   loading: "Minting your membership",
            //   success: "Welcome to Stay Chain",
            //   error: "Error minting NFT",
            // });
          },
        },
      }}
    >
      {children}
    </DynamicContextProvider>
  );
}
