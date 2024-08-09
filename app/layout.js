import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from './Navbar';
import { AuthContextProvider } from './AuthContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "IMS AI",
  description: "AI-powered inventory management system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <AuthContextProvider>
        <Navbar />
        {children}
      </AuthContextProvider>
      </body>
    </html>
  );
}
