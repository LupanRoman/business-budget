import { Inter } from "next/font/google";
import "@/app/globals.css";
import { redirect } from "next/navigation";
import ReduxProvider from "@/redux/redux-provider";
import { createClient } from "@/utils/supabase/server";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <html lang="en" className={inter.className}>
      <ReduxProvider>
        <body>{children}</body>
      </ReduxProvider>
    </html>
  );
}
