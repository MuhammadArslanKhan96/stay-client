// import { useAppKitProvider, useAppKitAccount } from "@reown/appkit/react";
import { Contract, ethers, Signer } from "ethers";
import abi from "../../stay-token.json";
import { toast } from "sonner";
import { config, getContract } from "./constants";
import ScanLink from "./ScanLink";
import { getWeb3Provider } from "@dynamic-labs/ethers-v6";

export const scanUrl = (hash: string) => {
  return `https://testnet.bscscan.com/tx/${hash}`;
};

const sendBNBUser = async (
  walletAddress: string | undefined,
  amount: string,
  // signer: ethers.providers.JsonRpcSigner,
  signer: ethers.JsonRpcSigner,
  provider: any
): Promise<boolean> => {
  try {
    const tx = {
      to: process.env.NEXT_PUBLIC_ADMIN_WALLET,
      // value: ethers.utils.parseEther(amount),
      value: ethers.parseEther(amount),
      // gasPrice: await provider.getGasPrice(),
      gasPrice: (await config.provider.getFeeData()).gasPrice,
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
    throw new Error("error sending tBNB: " + error.message);
  }
};

const sendBNBAdmin = async (
  recipeint: string | undefined,
  amount: string
): Promise<string> => {
  const tx = {
    to: recipeint,
    // value: ethers.utils.parseEther(amount),
    value: ethers.parseEther(amount),
    gasPrice: (await config.provider.getFeeData()).gasPrice,
    gasLimit: 21000, // Standard gas limit for simple transfers
  };
  try {
    const txRes = await config.adminSigner.sendTransaction(tx);
    const receipt = await txRes.wait();
    console.log("admin to user (BNB): " + scanUrl(txRes.hash));
    toast("Transaction 2/2 completed", {
      duration: 5000,
      cancel: "Close",
      // description: scanUrl(txRes.hash),
    });
    return scanUrl(txRes.hash);
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
    throw new Error("could not send bnb from admin" + error.message);
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
      // ethers.utils.parseEther(amount)
      ethers.parseEther(amount)
    );
    const receipt = await stcTx.wait();
    console.log("admin to user(STC): " + scanUrl(stcTx.hash));
    console.log(receipt);
    toast("Transaction 1/2 completed", {
      duration: 1000,
      cancel: "Close",
      description: scanUrl(stcTx.hash),
      // description: <ScanLink link={scanUrl(stcTx.hash)} />
    });
    return true;
  } catch (error: any) {
    console.error(error.message);
    throw new Error(error.message);
  }
};

const sendSTCAdmin = async (
  recipeint: string | undefined,
  amount: string
): Promise<string> => {
  let stcTx;
  try {
    stcTx = await config.contract.transfer(
      recipeint,
      // ethers.utils.parseEther(amount)
      ethers.parseEther(amount)
    );
    const receipt = await stcTx.wait();
    console.log(receipt);
    console.log("admin to user(STC): " + scanUrl(stcTx.hash));
    toast("Transaction 2/2 completed", {
      duration: 1000,
      cancel: "Close",
    });
    return scanUrl(stcTx.hash);
  } catch (error: any) {
    console.error("Failed to send STC: " + error.message);
    toast.error("swap failed", {
      className: "toast-style",
      description: "Transaction succuessful",
      duration: 5000,
      position: "top-right",
    });
    throw new Error("could not send stc from admin" + error.message);
  }
};

export const swapToken = async (
  walletProvider: any,
  walletAddress: string | undefined,
  direction: boolean,
  amount: string,
  stcAmount: string,
  primaryWallet: any
): Promise<string | undefined> => {
  if (
    process.env.NEXT_PUBLIC_STAY_CONTRACT &&
    process.env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY &&
    process.env.NEXT_PUBLIC_ADMIN_WALLET
  ) {
    // const ethersProvider = await new ethers.providers.Web3Provider(
    //   walletProvider
    // );
    // const ethersProvider = await new ethers.Web3Provider(
    //   walletProvider
    // );
    const ethersProvider = await getWeb3Provider(primaryWallet);
    // const ethersProvider = await new ethers
    // );
    console.log("swap");
    console.log("bnb amount" + amount);
    console.log("stc amount" + stcAmount);
    console.log(direction);
    const signer = config.provider.getSigner(walletAddress);
    const userSigner = await ethersProvider.getSigner(walletAddress);
    if (direction) {
      let stcTx: string;
      const bnbTx = await sendBNBUser(
        walletAddress,
        amount,
        userSigner,
        config.provider
      );
      // bnbTx
      //   ? stcTx = await sendSTCAdmin(walletAddress, stcAmount)
      //   : console.warn("user cancelled transaction or error");

      if (bnbTx) {
        stcTx = await sendSTCAdmin(walletAddress, stcAmount);
        console.log(stcTx);
        return stcTx;
      } else {
        console.warn("user cancelled transaction or error");
        return undefined;
      }
    } else {
      const stcTx = await sendSTCUser(stcAmount, userSigner);
      let bnbTx: string;
      // stcTx
      //   ? await sendBNBAdmin(walletAddress, amount)
      //   : console.warn("user cancelled transactionor error");
      if (stcTx) {
        bnbTx = await sendBNBAdmin(walletAddress, amount);
        console.log(bnbTx);
        return bnbTx;
      } else {
        console.warn("user cancelled transactionor error");
        return undefined;
      }
    }
    // return Promise.resolve(true);
  } else {
    console.log("Env not loaded");
    throw new Error("Env not loaded");
  }
};
