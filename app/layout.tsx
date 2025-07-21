import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { getCurrentUserFromCookies } from "@/features/auth/helpers/auth.server";
import { redirect } from "next/navigation";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FlexiTel",
  description: "Gestion d'abonnements mobiles",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

 
      
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          {children}
          </Providers>
      </body>
    </html>
  );
}
