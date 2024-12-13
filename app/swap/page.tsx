"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { swapToken } from "./swap";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { toast } from "sonner";

const handleSwap = () => {};

export default function Swap() {
  const [amount, setAmount] = useState<number>(0);
  const [stcAmount, setStcAmount] = useState<number>(0);
  useEffect(() => {
    if (!isNaN(amount) && amount > 0) {
      console.log(amount);
      const calculatedAmount = amount * 1000000;
      console.log(calculatedAmount);
      setStcAmount(calculatedAmount);
    }
  }, [amount]);
  const { walletProvider }: any = useAppKitProvider("eip155");
  const { address, caipAddress, isConnected } = useAppKitAccount();
  return (
    <div className="container" style={{ padding: "4rem" }}>
      <div className="d-flex justify-content-center">
        <div className="flex-col-center">
          {/* block-filter-search */}
          <div
            className="d-flex justify-content-center"
            style={{ marginBottom: "1rem" }}
          >
            <div className="col-lg-6">
              <div className="form-group">
                <label className="text-sm-medium neutral-1000">tBNB</label>
                <input
                  className="form-control"
                  type="number"
                  placeholder="Enter tBNB amount"
                  onChange={(e) => {
                    setAmount(parseFloat(e.target.value));
                  }}
                />
              </div>
            </div>
            <div className="swap-ball">
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
            <div className="col-lg-6">
              <div className="form-group">
                <label className="text-sm-medium neutral-1000">STC</label>
                <input
                  className="form-control"
                  type="number"
                  placeholder="STC"
                  // disabled
                  value={stcAmount}
                />
              </div>
            </div>
          </div>
          {/* <div className="filter-left">
            <form className="form-search-filter" action="#">
              <input
                className="form-control"
                type="number"
                name="key"
                placeholder="BNB to STC"
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                value={amount}
              />
            </form>
          </div> */}
          <button
            onClick={() => {
              if (isConnected) {
                const swap = swapToken(
                  walletProvider,
                  address,
                  amount.toString()
                );
                toast.promise(swap, {
                  loading: "Swaping ...",
                  success: "You got STC",
                  error: "Could Not Swap",
                });
              } else {
                console.warn("wallet not connected");
              }
            }}
            className="btn btn-black-lg"
            //   onClick={() => {
            //     swapToken();
            //   }}
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
