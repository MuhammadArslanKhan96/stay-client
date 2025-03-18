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
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();
  const referralCode = searchParams.get('ref') as string;

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
            if (!user.user.newUser) {
              console.log("Called AN API");
              try{
                  const payload: { email: string; username: string; wallet: any, } =
                  {
                    email: user.user.email ?? "",
                    username: user.user.firstName ?? "",
                    wallet: user.primaryWallet ?? "",
                  };
                  const withReferralCode = {...payload, referralCode}
                  // const newUser = await createUser(payload);
                  const response = await fetch(
                    `/api/user/signup`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(withReferralCode),
                    }
                  );
                  const responseData = await response.json();
                  // New User is created...
                  console.log(responseData);
                  const minting = mintNftOnSignin(user.primaryWallet);
                  toast.promise(minting, {
                    loading: "Minting your membership",
                    success: "Welcome to Stay Chain",
                    error: "Error minting NFT",
                  });

              }catch(err){
                console.log("Error while creating the user...",  err);
              }
             
            } else {
              toast.success("Welcome back!");
              // Save user in session storage/localstorage...
              const userEmail = user.user.email;
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
