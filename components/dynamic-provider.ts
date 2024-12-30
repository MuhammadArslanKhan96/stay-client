"use client";
import { ReactNode } from "react";
import { DynamicContextProvider } from "../lib/dynamic";
import { EthereumWalletConnectors } from "../lib/dynamic";
import { DynamicClientExtensionArgs } from "@prisma/client/runtime/library";

export default function ProviderWrapper({ children }: any) {
  return (
    // <DynamicContextProvider>
    { children }
    // </DynamicContextProvider>
  );
}
