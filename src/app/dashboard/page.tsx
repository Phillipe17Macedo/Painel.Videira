"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, Button } from "@mui/material";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import Navbar from "./Navbar";
import AuthGuard from "../components/AuthGuard";
import SummaryCards from "./SummaryCards";

const barData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 500 },
  { name: "Apr", value: 200 },
  { name: "May", value: 278 },
  { name: "Jun", value: 189 },
];

const lineData = [
  { name: "Jan", uv: 2400 },
  { name: "Feb", uv: 1398 },
  { name: "Mar", uv: 9800 },
  { name: "Apr", uv: 3908 },
  { name: "May", uv: 4800 },
  { name: "Jun", uv: 3800 },
];

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/");
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    router.push("/");
  };

  return (
    <AuthGuard>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#121212",
          color: "#fff",
          fontFamily: "Poppins, sans-serif",
          display: "flex",
        }}
      >
        <Navbar onLogout={handleLogout} />
        <Box
          sx={{
            flex: 1,
            p: { xs: 1, sm: 2, md: 4 },
            ml: { md: "220px" },
            width: "100%",
            maxWidth: "100vw",
            boxSizing: "border-box",
          }}
        >
          <SummaryCards />
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", md: "center" },
              mb: 4,
              gap: 2,
            }}
          >
            <Typography variant="h4" fontWeight={700}>
              Dashboard
            </Typography>
          </Box>
          <Box sx={{ width: "100%", height: { xs: 220, sm: 300 }, mb: 6 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip />
                <Bar dataKey="value" fill="#305BDD" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
          <Box sx={{ width: "100%", height: { xs: 220, sm: 300 } }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid stroke="#333" strokeDasharray="5 5" />
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip />
                <Line type="monotone" dataKey="uv" stroke="#294273" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </Box>
    </AuthGuard>
  );
}
