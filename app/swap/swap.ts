// import { useAppKitProvider, useAppKitAccount } from "@reown/appkit/react";
import { Contract, ethers, Signer } from "ethers";
import abi from "../../stay-token.json";
import { toast } from "sonner";
import { config, getContract } from "./constants";

const scanUrl = (hash: string) => {
  return `https://testnet.bscscan.com/tx/${hash}`;
};

const sendBNBUser = async (
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
    const receipt = await txRes.wait();
    console.log(receipt);
    console.log("user to admin (tBNB): " + scanUrl(txRes.hash));
    toast("Transaction 1/2 completed", {
      duration: 5000,
      cancel: "Close",
    });
    return true;
  } catch (error: any) {
    console.error("error sending tBNB: " + error.message);
    console.warn(error);
    if (error.code == 4001) {
      toast.error("Swap cancelled", {
        className: "toast-style",
        description: "You concelled the swap",
        duration: 2000,
        position: "top-right",
      });
    }
    throw error;
  }
};

const sendBNBAdmin = async (recipeint: string | undefined, amount: string) => {
  const tx = {
    to: recipeint,
    value: ethers.utils.parseEther(amount),
    gasPrice: await config.provider.getGasPrice(),
    gasLimit: 21000, // Standard gas limit for simple transfers
  };
  try {
    const txRes = await config.adminSigner.sendTransaction(tx);
    const receipt = txRes.wait();
    console.log("admin to user (BNB): " + scanUrl(txRes.hash));
    toast("Transaction 2/2 completed", {
      duration: 5000,
      cancel: "Close",
      description: scanUrl(txRes.hash),
    });
  } catch (error: any) {
    console.error("error sending tBNB: " + error.message);
    console.warn(error);
    if (error.code == 4001) {
      toast.error("Swap cancelled", {
        className: "toast-style",
        description: "You concelled the swap",
        duration: 2000,
        position: "top-right",
      });
    }
    throw error;
  }
};

const sendSTCUser = async (
  amount: string,
  signer: Signer
): Promise<boolean> => {
  const contract = await getContract(signer);
  try {
    const stcTx = await contract.transfer(
      config.adminWallet,
      ethers.utils.parseEther(amount)
    );
    console.log("admin to user(STC): " + scanUrl(stcTx.hash));
    const receipt = await stcTx.wait();
    console.log(receipt);
    toast("Transaction 1/2 completed", {
      duration: 1000,
      cancel: "Close",
      description: scanUrl(stcTx.hash),
    });
    return true;
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
};

const sendSTCAdmin = async (
  recipeint: string | undefined,
  amount: string
): Promise<boolean> => {
  let stcTx;
  try {
    stcTx = await config.contract.transfer(
      recipeint,
      ethers.utils.parseEther(amount)
    );
    const receipt = await stcTx.wait();
    console.log(receipt);
    console.log("admin to user(STC): " + scanUrl(stcTx.hash));
    toast("Transaction 2/2 completed", {
      duration: 1000,
      cancel: "Close",
    });
    return true;
  } catch (error: any) {
    console.error("Failed to send STC: " + error.message);
    toast.error("swap failed", {
      className: "toast-style",
      description: "Transaction succuessful",
      duration: 5000,
      position: "top-right",
    });
    throw error;
  }
};

export const swapToken = async (
  walletProvider: any,
  walletAddress: string | undefined,
  direction: boolean,
  amount: string,
  stcAmount: string
) => {
  if (
    process.env.NEXT_PUBLIC_STAY_CONTRACT &&
    process.env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY &&
    process.env.NEXT_PUBLIC_ADMIN_WALLET
  ) {
    const ethersProvider = await new ethers.providers.Web3Provider(
      walletProvider
    );
    console.log("swap");
    console.log("bnb amount" + amount);
    console.log("stc amount" + stcAmount);
    console.log(direction);
    const signer = config.provider.getSigner(walletAddress);
    const userSigner = ethersProvider.getSigner(walletAddress);
    if (direction) {
      const bnbTx = await sendBNBUser(
        walletAddress,
        amount,
        userSigner,
        config.provider
      );
      bnbTx
        ? await sendSTCAdmin(walletAddress, stcAmount)
        : console.warn("user cancelled transaction or error");
    } else {
      const stcTx = await sendSTCUser(stcAmount, userSigner);
      stcTx
        ? await sendBNBAdmin(walletAddress, amount)
        : console.warn("user cancelled transactionor error");
    }
  } else {
    console.log("Env not loaded");
  }
};
