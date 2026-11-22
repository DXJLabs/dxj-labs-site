import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./platform.css";
import "./living.css";
import "./taste-motion.css";
import "./taste-polish.css";
import "./real-platform.css";

export const metadata: Metadata = {
  title: "DXJ Labs — Multi-Chain Web3 Product Ecosystem",
  description: "DXJ Labs is an independent multi-chain Web3 product studio building products, documenting activities and research, and preparing transparent ecosystem reporting.",
  openGraph: { title: "DXJ Labs — Ideas Deserve to Be Built", description: "Independent multi-chain Web3 product ecosystem. Research, design, build.", type: "website" },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f4f2eb" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
 return <html lang="en" data-type="software" data-radius="sharp" data-buttons="solid" data-motion="on">
  <head>
    <meta name="page-type" content="software" />
    <meta name="site-kind" content="software" />
    <link rel="stylesheet" href="/taste/motion/motion.css" />
    <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add(\'m-enter\');setTimeout(()=>document.documentElement.classList.add(\'m-enter-done\'),700);" }} />
  </head>
  <body>{children}</body>
 </html>;
}
