import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Audio Cutter",
  description: "Created by narender",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` bg-gray-900 text-white ${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
