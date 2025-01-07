import { config, getMembershipContract } from "@/app/swap/constants";
import { scanUrl } from "@/app/swap/swap";
import { getWeb3Provider } from "@dynamic-labs/ethers-v6";

export const mintNftOnSignin = async (wallet: any) => {
  console.log("wallet", wallet);
  if (!wallet) {
    console.error("No wallet found");
    throw new Error();
  }
  let receipt;
  try {
    const mintNft = await config.membershipContract.safeMint(wallet.address);
    receipt = await mintNft.wait();
    console.log(receipt, receipt);
    const url = scanUrl(receipt.transactionHash);
    console.log("Minted NFT: " + url);
    return url;
  } catch (error: any) {
    console.error("Failed to mint NFT: " + error.message);
  }
  // return scanUrl(receipt.transactionHash);
};

export const updateNft = async (wallet: any, tier: string) => {
  console.log("wallet", wallet, tier);
  const tokenId = await config.membershipContract.membership(wallet);
  let update;
  try {
    update = await config.membershipContract.updateTier(tokenId, tier);
    const receipt = await update.wait();
    const url = scanUrl(receipt.transactionHash);
    console.log("Updated NFT: " + url);
    return url;
  } catch (error: any) {
    console.error("Failed to update NFT: " + error.message);
  }
};
