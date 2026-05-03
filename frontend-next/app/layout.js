import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import ClientProviders from "@/components/layout/ClientProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CampusHub",
  description: "Discover campus events, academic resources, and student deals for SJSU students.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider>
            <ClientProviders>{children}</ClientProviders>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
