"use client";

import { useEffect } from "react";

export default function AuthLayout({ children }) {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
  }, []);

  return <>{children}</>;
}
