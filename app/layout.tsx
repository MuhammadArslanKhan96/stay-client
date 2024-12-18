import "react-perfect-scrollbar/dist/css/styles.css";
import "/public/assets/css/style.css";
import type { Metadata } from "next";
import { Manrope, Merienda } from "next/font/google";
import { AppKit } from "@/context/appkit";
import Layout from "@/components/layout/Layout";
import { Toaster } from "sonner";

const manrope_init = Manrope({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--manrope",
  display: "swap",
});
const merienda_init = Merienda({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--merienda",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Stay Chain",
  description: "Hotel Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope_init.variable} ${merienda_init.variable}`}
    >
      <body>
        <AppKit>
          <Layout headerStyle={1} footerStyle={1}>
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                className: "toast-style",
                duration: 5000,
              }}
            />
          </Layout>
        </AppKit>
      </body>
    </html>
  );
}
