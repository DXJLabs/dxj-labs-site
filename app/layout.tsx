import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./platform.css";

export const metadata: Metadata = {
  title: "DXJ Labs — Multi-Chain Web3 Product Ecosystem",
  description: "DXJ Labs is an independent multi-chain Web3 product studio building products, documenting activities and research, and preparing transparent ecosystem reporting.",
  openGraph: { title: "DXJ Labs — Ideas Deserve to Be Built", description: "Independent multi-chain Web3 product ecosystem. Research, design, build.", type: "website" },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f4f2eb" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
 return <html lang="en"><body>{children}</body></html>;
}
