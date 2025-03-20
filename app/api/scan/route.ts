// app/api/scan/route.ts
import { NextResponse } from 'next/server';
import ABI_FILE from '../../../abis/ABI.json';
import { ethers } from 'ethers';

// On scan the QR code...
export async function POST(request: Request) {
  try {
    const { userId, qrId } = await request.json();

    // Validate the input
    if (!userId || !qrId) {
      console.log("Missing user ID or QR ID");
      return NextResponse.json(
        { message: 'Missing userId or qrId' },
        { status: 400 }
      );
    }

    // Perform backend operations (e.g., log the scan, update the database)
    console.log(`QR Code Scanned - User ID: ${userId}, QR ID: ${qrId}`);

    // Transfer tokens to the recipient (replace with actual recipient address)
    // const recipientAddress = "0x2f3F1817259146a9715bD606211D14AB87ad9A49"; // Replace with the recipient's address
    // const amount = "1"; // Amount of tokens to transfer

    // const receipt = await transferAmount(recipientAddress, amount);

    return NextResponse.json({
      message: 'Scan logged successfully and tokens transferred',
      userId,
      qrId,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// Function to transfer tokens
// async function transferAmount(to: string, amount: string) {
//   try {
//     const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;
//     const CONTRACT_ADDRESS = "0x77DAa7f27DD086C9708B39D4209a46eDe72B7132";

//     if (!privateKey) {
//       throw new Error("Please set PRIVATE_KEY in your .env file");
//     }

//     // Initialize provider and signer
//     const provider = new ethers.JsonRpcProvider("https://opbnb-testnet.infura.io/v3/6be70b170cc14d08b20616d6c5e52682");
//     const signer = new ethers.Wallet(privateKey, provider);

//     // Initialize contract
//     const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI_FILE, signer);

//     // Convert amount to the smallest unit (e.g., wei for tokens)
//     const amountInWei = ethers.parseUnits(amount, 18);

//     // Call the transfer function
//     const tx = await contract.transfer(to, amountInWei);

//     console.log("Transaction sent:", tx.hash);

//     // Wait for the transaction to be mined
//     const receipt = await tx.wait();

//     console.log("Transaction successful:", receipt);
//     return receipt;
//   } catch (err) {
//     console.error("Error transferring tokens:", err);
//     throw err;
//   }
// }

// async function transferAmount(to: string, amount: string) {
//     try {
//       const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;
//       const CONTRACT_ADDRESS = "0x77DAa7f27DD086C9708B39D4209a46eDe72B7132";
  
//       if (!privateKey) {
//         throw new Error("Please set PRIVATE_KEY in your .env file");
//       }
  
//       // Use the official opBNB Testnet RPC endpoint
//       const provider = new ethers.JsonRpcProvider("https://opbnb-testnet-rpc.bnbchain.org");
//       const signer = new ethers.Wallet(privateKey, provider);

//       //Checking for user's balance:
//       //const balance = await provider.getBalance(signer.address);
//       //console.log("Wallet Balance:", ethers.formatEther(balance), "BNB");

//       // Initialize contract
//       const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI_FILE, signer);
  
//       // Convert amount to the smallest unit (e.g., wei for tokens)
//       const amountInWei = ethers.parseUnits(amount, 18);
  
//       // Call the transfer function
//       const tx = await contract.transfer(to, amountInWei);
  
//       console.log("Transaction sent:", tx.hash);
  
//       // Wait for the transaction to be mined
//       const receipt = await tx.wait();
  
//       console.log("Transaction successful:", receipt);
//       return receipt;
//     } catch (err) {
//       console.error("Error transferring tokens:", err);
//       throw err;
//     }
// }