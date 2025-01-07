"use client";

import { Contract, ethers, JsonRpcProvider, Signer } from "ethers";
import abi from "../../stay-token.json";
import membershipAbi from "../../stay-membership.json";
import { getWeb3Provider } from "@dynamic-labs/ethers-v6";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
// const {primaryWallet} = useDynamicContext();
const adminPrivateKey: any = process.env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY;
const contractAddress: any = process.env.NEXT_PUBLIC_STAY_CONTRACT;
// const tbnbProvider = new ethers.providers.JsonRpcProvider(
//   process.env.NEXT_PUBLIC_TBNB_RPCURL
// );
const membershipContractAddress: any = process.env.NEXT_PUBLIC_STAY_MEMBERSHIP;
const tbnbProvider = new JsonRpcProvider(process.env.NEXT_PUBLIC_TBNB_RPCURL);
const adminSigner = new ethers.Wallet(adminPrivateKey, tbnbProvider);
const stayContract = new Contract(contractAddress, abi, adminSigner);
const membershipContract = new Contract(
  membershipContractAddress,
  membershipAbi,
  adminSigner
);
const userStayContract = new Contract(contractAddress, abi);

export const config = {
  contractAddress: contractAddress,
  adminSigner: adminSigner,
  contract: stayContract,
  membershipContract: membershipContract,
  provider: tbnbProvider,
  adminWallet: process.env.NEXT_PUBLIC_ADMIN_WALLET,
  contractInterface: new ethers.Interface(abi),
  membershipInterface: new ethers.Interface(membershipAbi),
};

export const getContract = async (signer: Signer) => {
  return new Contract(contractAddress, abi, signer);
};

export const getMembershipContract = async (signer: Signer) => {
  return new Contract(membershipContract, membershipAbi, signer);
};
