"use client";

import { createAppKit } from "@reown/appkit/react";
import { Ethers5Adapter } from "@reown/appkit-adapter-ethers5";
import { sepolia, opBNBTestnet, defineChain } from "@reown/appkit/networks";
import Home from "@/app/page";
import TourDetail from "@/app/tour-detail/page";
import Layout from "@/components/layout/Layout";

// 1. Get projectId at https://cloud.reown.com
const projectId = "fc17ac7944916232d6e4b92c9057e2a7";

// 2. Create a metadata object
const metadata = {
  name: "stay",
  description: "My Website description",
  url: "https://mywebsite.com", // origin must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};

const rpcUrl: any = process.env.NEXT_PUBLIC_TBNB_RPCURL;
const bnbTest = defineChain({
  id: 97,
  caipNetworkId: "eip155:97",
  chainNamespace: "eip155",
  name: "bnb test",
  nativeCurrency: {
    decimals: 18,
    name: "BNB",
    symbol: "TBNB",
  },
  rpcUrls: {
    default: {
      http: [rpcUrl],
      // webSocket: ["WS_RPC_URL"],
    },
  },
  // blockExplorers: {
  //   default: { name: "Explorer", url: "BLOCK_EXPLORER_URL" },
  // },
  // contracts: {
  //   // Add the contracts here
  // },
});

// 3. Create the AppKit instance
createAppKit({
  adapters: [new Ethers5Adapter()],
  metadata: metadata,
  networks: [sepolia, bnbTest],
  projectId,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});

export function AppKit({ children }: any) {
  return (
    <Layout>{children}</Layout> //make sure you have configured the <appkit-button> inside
  );
}
