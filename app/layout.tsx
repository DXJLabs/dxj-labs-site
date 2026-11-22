import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DXJ Labs — Independent Digital Product Studio",
  description: "DXJ Labs is an independent product studio exploring privacy, AI, digital infrastructure and interactive experiences. Based in East Kalimantan, Indonesia.",
  openGraph: { title: "DXJ Labs — Ideas Into Systems", description: "Independent digital product studio. Research, design, build.", type: "website" },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0a0d0b" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
 return <html lang="en"><body>{children}</body></html>;
}
