"use client";
import Link from "next/link";
import React, { useState } from "react";
import { swapToken } from "./swap";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";

export default function Swap() {
  const [amount, setAmount] = useState<string>("0");
  const { walletProvider }: any = useAppKitProvider("eip155");
  const { address, caipAddress, isConnected } = useAppKitAccount();
  return (
    <div className="container" style={{ padding: "4rem" }}>
      <div className="d-flex justify-content-center">
        <div className="block-filter-search">
          <div className="filter-left">
            <form className="form-search-filter" action="#">
              <input
                className="form-control"
                type="text"
                name="key"
                placeholder="BNB to STC"
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                value={amount}
              />
            </form>
          </div>
          <button
            onClick={() => {
              isConnected
                ? swapToken(walletProvider, address, amount)
                : console.warn("wallet not connected");
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
