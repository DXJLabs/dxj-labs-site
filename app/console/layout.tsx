import type { Metadata } from "next";
import "./console.css";

export const metadata: Metadata = {
  title: {
    default: "Ecosystem Console | DXJ Labs",
    template: "%s | DXJ Labs Console",
  },
  description: "Public development telemetry, verified GitHub repository activity and transparent integration states from DXJ Labs.",
};

export default function ConsoleLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
