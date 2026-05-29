import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Learning Dashboard",
  description: "Next-Gen Student Learning Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-linear-to-br from-[#000000] via-[#210735] to-[#000000] text-white flex flex-col md:flex-row">
        <Sidebar />
        <main className="flex-1 md:ml-16 lg:ml-64 pt-0 md:pt-0 pb-20 md:pb-0">
          {children}
        </main>
      </body>
    </html>
  );
}
