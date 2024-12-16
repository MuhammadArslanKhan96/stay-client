import { Contract, ethers, Signer } from "ethers";
import abi from "../../stay-token.json";

const adminPrivateKey: any = process.env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY;
const contractAddress: any = process.env.NEXT_PUBLIC_STAY_CONTRACT;
const tbnbProvider = new ethers.providers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_TBNB_RPCURL
);
const adminSigner = new ethers.Wallet(adminPrivateKey, tbnbProvider);
const stayContract = new Contract(contractAddress, abi, adminSigner);
const userStayContract = new Contract(contractAddress, abi);

export const config = {
  contractAddress: contractAddress,
  adminSigner: adminSigner,
  contract: stayContract,
  provider: tbnbProvider,
  adminWallet: process.env.NEXT_PUBLIC_ADMIN_WALLET,
};

export const getContract = async (signer: Signer) => {
  return new Contract(contractAddress, abi, signer);
};
