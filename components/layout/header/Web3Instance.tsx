"use client";

import { createWeb3Modal, defaultConfig } from "@web3modal/ethers5/react";

// 1. Get projectId
const projectId = "86ca01c30a737efcc2113f60037fee6e";

// 2. Set chains
// const mainnet = {
//     chainId: 137,
//     name: "Polygon",
//     currency: "Matic",
//     explorerUrl: "https://polygonscan.com/",
//     rpcUrl: "https://polygon-rpc.com/",
// };

const mumbai = {
    chainId: 80002,
    name: "Mumbai",
    currency: "MATIC",
    explorerUrl: "https://amoy.polygonscan.com/",
    rpcUrl: "https://polygon-amoy.blockpi.network/v1/rpc/public",
};

// 3. Create modal
const metadata = {
    name: "My Website",
    description: "My Website description",
    url: "https://mywebsite.com", // origin must match your domain & subdomain
    icons: ["https://avatars.mywebsite.com/"],
};

createWeb3Modal({
    ethersConfig: defaultConfig({ metadata }),
    chains: [mumbai],
    projectId,
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

export function Web3ModalProvider({ children }: any) {
    return children;
}
