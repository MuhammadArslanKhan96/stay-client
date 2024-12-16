"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { swapToken } from "./swap";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { toast } from "sonner";
import { ethers } from "ethers";
import { config } from "./constants";

export default function Swap() {
  const [amount, setAmount] = useState<number>(0);
  const [stcAmount, setStcAmount] = useState<number>(0);
  const [direction, setDirection] = useState<boolean>(true);
  const [stcBalance, setStcBalance] = useState<number>(0);
  /* True for forward(BNB to STC) False for backward (STC to BNB)*/
  useEffect(() => {
    // if (!isNaN(amount) && amount > 0) {
    //   console.log(amount);
    //   const calculatedAmount = direction ? amount * 1000000 : amount / 1000000;
    //   console.log(calculatedAmount);
    //   setStcAmount(calculatedAmount);
    // }
    if (direction) {
      console.log(amount);
      const calculatedAmount = amount * 1000000;
      console.log(calculatedAmount);
      setStcAmount(calculatedAmount);
    } else {
      console.log(stcAmount);
      const calculatedAmount = stcAmount / 1000000;
      console.log(calculatedAmount);
      setAmount(calculatedAmount);
    }
  }, [amount, direction, stcAmount]);
  const { walletProvider }: any = useAppKitProvider("eip155");
  const { address, caipAddress, isConnected } = useAppKitAccount();
  // const provider: any = new ethers.providers.Web3Provider(walletProvider);
  const checkForStc = async (): Promise<boolean> => {
    let balance: number = parseFloat(await config.contract.balanceOf(address));
    if (balance > 0) {
      setStcBalance(balance);
      setDirection(!direction);
      toast.success(
        `You can swap ${direction ? "STC" : "tBNB"} for ${
          !direction ? "STC" : "tBNB"
        }`
      );
      return true;
    } else {
      toast.error(`you dont have ${direction ? "STC" : "tBNB"}`);
      console.error(`you dont have ${direction ? "STC" : "tBNB"}`);
      return false;
    }
  };

  const displayBnbInput = () => {
    return (
      <div className="col-lg-6">
        <div className="form-group">
          <label className="text-sm-medium neutral-1000">tBNB</label>
          <input
            className="form-control"
            type="number"
            placeholder="Enter tBNB amount"
            onChange={(e) => {
              // direction ? setAmount(parseFloat(e.target.value)) : null;
              setAmount(parseFloat(e.target.value));
            }}
            // value={direction ? stcAmount : amount}
            value={amount}
            disabled={!direction}
          />
        </div>
      </div>
    );
  };

  const displayStcInput = () => {
    return (
      <div className="col-lg-6">
        <div className="form-group">
          <label className="text-sm-medium neutral-1000">STC</label>
          <input
            className="form-control"
            type="number"
            placeholder="STC"
            disabled={direction}
            onChange={(e) => {
              // !direction ? setAmount(parseFloat(e.target.value)) : null;
              setStcAmount(parseFloat(e.target.value));
            }}
            // value={!direction ? stcAmount : amount}
            value={stcAmount}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="container" style={{ padding: "4rem" }}>
      <div className="d-flex justify-content-center">
        <div className="flex-col-center">
          {/* block-filter-search */}
          <div
            className="d-flex flex-column flex-md-row align-items-center justify-content-center"
            style={{ marginBottom: "1rem" }}
          >
            {direction ? displayBnbInput() : displayStcInput()}
            {/* <div className="col-lg-6">
              <div className="form-group">
                <label className="text-sm-medium neutral-1000">
                  {direction ? "tBNB" : "STC"}
                </label>
                <input
                  className="form-control"
                  type="number"
                  placeholder={
                    direction ? "Enter tBNB amount" : "Enter STC Amount"
                  }
                  onChange={(e) => {
                    direction ? setAmount(parseFloat(e.target.value)) : null;
                  }}
                  // value={direction ? stcAmount : amount}
                  value={amount}
                  // disabled={!direction}
                />
              </div>
            </div> */}
            <div
              className="swap-ball"
              onClick={() => {
                checkForStc();
              }}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 512 512"
                className="swap-ball-icon"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M131.3 231.1L32 330.6l99.3 99.4v-74.6h174.5v-49.7H131.3v-74.6zM480 181.4L380.7 82v74.6H206.2v49.7h174.5v74.6l99.3-99.5z"></path>
              </svg>
            </div>
            {!direction ? displayBnbInput() : displayStcInput()}
            {/* <div className="col-lg-6">
              <div className="form-group">
                <label className="text-sm-medium neutral-1000">
                  {direction ? "STC" : "tBNB"}
                </label>
                <input
                  className="form-control"
                  type="number"
                  placeholder={direction ? "STC" : "tBNB"}
                  // disabled={!direction}
                  disabled
                  onChange={(e) => {
                    !direction ? setAmount(parseFloat(e.target.value)) : null;
                  }}
                  // value={!direction ? stcAmount : amount}
                  value={stcAmount}
                />
              </div>
            </div> */}
          </div>
          <button
            onClick={async () => {
              // console.log(await checkForStc());
              if (isConnected) {
                const swap = swapToken(
                  walletProvider,
                  address,
                  direction,
                  amount.toString(),
                  stcAmount.toString()
                );
                toast.promise(swap, {
                  loading: `Swaping ${
                    direction ? "tBNB for STC" : "STC for tBNB"
                  }...`,
                  success: `You got ${
                    direction ? `${stcAmount} STC` : `${amount} tBNB`
                  }`,
                  error: "Could Not Swap",
                });
              } else {
                console.warn("wallet not connected");
              }
            }}
            className="btn btn-black-lg"
          >
            Get STC
            <svg
              width={16}
              height={16}
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 15L15 8L8 1M15 8L1 8"
                stroke=""
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
