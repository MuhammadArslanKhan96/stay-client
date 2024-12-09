"use client";

import { createAppKit } from "@reown/appkit/react";
import { Ethers5Adapter } from "@reown/appkit-adapter-ethers5";
import { mainnet, arbitrum } from "@reown/appkit/networks";
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

// 3. Create the AppKit instance
createAppKit({
  adapters: [new Ethers5Adapter()],
  metadata: metadata,
  networks: [mainnet, arbitrum],
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
