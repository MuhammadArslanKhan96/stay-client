// import { useAppKitProvider, useAppKitAccount } from "@reown/appkit/react";
import { Contract, ethers } from "ethers";
import abi from "../../stay-token.json";

const scanUrl = (hash: string) => {
  return `https://testnet.bscscan.com/tx/${hash}`;
};

const sendBNB = async (
  walletAddress: string | undefined,
  amount: string,
  signer: ethers.providers.JsonRpcSigner,
  provider: any
): Promise<boolean> => {
  try {
    const tx = {
      to: process.env.NEXT_PUBLIC_ADMIN_WALLET,
      value: ethers.utils.parseEther(amount),
      gasPrice: await provider.getGasPrice(),
      gasLimit: 21000, // Standard gas limit for simple transfers
    };
    const txRes = await signer.sendTransaction(tx);
    // console.log(txRes);
    console.log("user to admin (tBNB): " + scanUrl(txRes.hash));
    return true;
  } catch (error: any) {
    console.error("error send tBNB: " + error.message);
    return false;
  }
};

const sendSTC = async (
  recipeint: string | undefined,
  stayContractAddress: string,
  abiFile: any,
  amount: string
): Promise<boolean> => {
  const tbnbProvider = new ethers.providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_TBNB_RPCURL
  );
  const adminPrivateKey: string = process.env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY
    ? process.env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY
    : "";
  const adminSigner = new ethers.Wallet(adminPrivateKey, tbnbProvider);
  const stayContract = new Contract(stayContractAddress, abiFile, adminSigner);
  let sendSTC;
  try {
    sendSTC = await stayContract.transfer(
      recipeint,
      ethers.utils.parseEther(amount)
    );
    console.log("admin to user(STC): " + scanUrl(sendSTC.hash));
    return true;
  } catch (error: any) {
    console.error("Failed to send STC: " + error.message);
    return false;
  }
  // console.log(sendSTC);
};

export const swapToken = async (
  walletProvider: any,
  walletAddress: string | undefined,
  amount: string
) => {
  if (
    process.env.NEXT_PUBLIC_STAY_CONTRACT &&
    process.env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY &&
    process.env.NEXT_PUBLIC_ADMIN_WALLET
  ) {
    console.log("swap");
    const abiFile: any = abi;
    const ethersProvider = new ethers.providers.Web3Provider(walletProvider);
    const stayContractAddress: string = process.env.NEXT_PUBLIC_STAY_CONTRACT
      ? process.env.NEXT_PUBLIC_STAY_CONTRACT
      : "";
    const signer = ethersProvider.getSigner();
    const swapValue: number = 1000000; // one tbnb is equal to 1000000 STC. 1 stc is equal to 0.000001;
    const swapAmount: string = (swapValue * parseFloat(amount)).toString();
    console.log("amount: " + amount + "\nswapAmount: " + swapAmount);
    console.log("stc amount: " + ethers.utils.parseEther(swapAmount));
    const bnbTx = await sendBNB(walletAddress, amount, signer, ethersProvider);
    bnbTx
      ? await sendSTC(walletAddress, stayContractAddress, abiFile, swapAmount)
      : console.warn("user cancelled transaction or error");
  } else {
    console.log("Env not loaded");
  }
};
