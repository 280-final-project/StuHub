"use client";

import { usePathname } from "next/navigation";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

const AUTH_ROUTES = ["/login", "/signup"];
const LANDING_ROUTE = "/";

export default function ClientProviders({ children }) {
  const pathname = usePathname();
  const isAuth = AUTH_ROUTES.includes(pathname);
  const isLanding = pathname === LANDING_ROUTE;
  const hideChrome = isAuth || isLanding;

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {hideChrome ? (
        <>{children}</>
      ) : (
        <div className="page-shell">
          <div className="page-frame">
            <Navbar />
            <main>{children}</main>
            <Footer />
          </div>
        </div>
      )}
    </GoogleOAuthProvider>
  );
}
