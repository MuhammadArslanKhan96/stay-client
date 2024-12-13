// import { useAppKitProvider, useAppKitAccount } from "@reown/appkit/react";
import { Contract, ethers } from "ethers";
import abi from "../../stay-token.json";

const scanUrl = (hash: string) => {
  return `https://testnet.bscscan.com/tx/${hash}`;
};

export const swapToken = async (
  walletProvider: any,
  walletAddress: string | undefined,
  amount: string
) => {
  console.log("swap");
  const abiFile: any = abi;
  //   const { address, caipAddress, isConnected } = useAppKitAccount();

  //   const ethersProvider = new ethers.providers.BaseProvider(walletProvider);
  const ethersProvider = new ethers.providers.Web3Provider(walletProvider);
  const stayContractAddress: string = process.env.NEXT_PUBLIC_STAY_CONTRACT
    ? process.env.NEXT_PUBLIC_STAY_CONTRACT
    : "";
  const tbnbProvider = new ethers.providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_TBNB_RPCURL
  );
  const signer = ethersProvider.getSigner();
  //   const network = await ethersProvider.getNetwork();
  //   if (network.chainId.toString() !== "97") {
  //     // Chain ID 97 is for BSC Testnet
  //     throw new Error(
  //       "User is not connected to the tBNB chain (BSC Testnet). Detected chain ID: " +
  //         network.chainId.toString()
  //     );
  //   }
  const adminPrivateKey: string = process.env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY
    ? process.env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY
    : "";
  const adminSigner = new ethers.Wallet(adminPrivateKey, tbnbProvider);
  const stayContract = new Contract(stayContractAddress, abiFile, adminSigner);
  const swapValue: number = 1000000; // one tbnb is equal to 100000 STC. 1 stc is equal to 0.000001;
  const value = ethers.utils.parseEther(amount);

  const swapAmount: string = (swapValue * parseFloat(amount)).toString();
  console.log("amount: " + amount);
  console.log("stc amount: " + ethers.utils.parseEther(swapAmount));
  // Create the transaction
  try {
    const tx = {
      to: process.env.NEXT_PUBLIC_ADMIN_WALLET,
      value: value,
      gasPrice: await ethersProvider.getGasPrice(),
      gasLimit: 21000, // Standard gas limit for simple transfers
    };
    const txRes = await signer.sendTransaction(tx);
    console.log("sent tBNB: " + txRes);
    // const adminTx = {
    //   to: walletAddress,
    //   value: ethers.utils.parseEther(swapAmount),
    //   gasPrice: await tbnbProvider.getGasPrice(),
    //   gasLimit: 21000,
    // };
    // const adminTxRes = await adminSigner.sendTransaction(adminTx);
    const sendSTC = await stayContract.transfer(
      walletAddress,
      ethers.utils.parseEther(swapAmount)
    );

    console.log(sendSTC);
    console.log(scanUrl(sendSTC.hash));
  } catch (error: any) {
    console.error("error sending tBNB: " + error.message);
  }
};
