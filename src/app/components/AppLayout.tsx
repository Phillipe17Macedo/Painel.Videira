"use client";
import Navbar from "../dashboard/Navbar";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Função de logout global
  const handleLogout = useCallback(() => {
    sessionStorage.removeItem("token");
    router.push("/");
  }, [router]);

  // Não exibe Navbar na tela de login
  const showNavbar = pathname !== "/" && pathname !== "/login";

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#121212" }}>
      {showNavbar && <Navbar onLogout={handleLogout} />}
      <div
        style={{
          flex: 1,
          minHeight: "100vh",
          marginLeft: showNavbar ? undefined : 0, // Remove valor fixo
          transition: "margin 0.2s",
        }}
      >
        {children}
      </div>
    </div>
  );
}
