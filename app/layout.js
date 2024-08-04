import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "./SessionProvider";
import Login from "./Login";
import Home from "./page";
import { authOptions } from "./api/auth/[...nextauth]";
 
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "IMS AI",
  description: "AI-powered inventory management system",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        {/* <SessionProvider session={session}> */}
          {/* if session not available show login otherwise home */}
          {/* {!session ? ( */}
            {/* <Login /> */}
          {/* ): ( */}
            {/* <Home /> */}
          {/* )} */}
        {/* </SessionProvider> */}
      </body>
    </html>
  );
}
