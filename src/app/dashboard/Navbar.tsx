"use client";
import { useState } from "react";
import { Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";
import PeopleIcon from "@mui/icons-material/People";
import { useRouter, usePathname } from "next/navigation";

const navWidth = 220;

export default function Navbar({ onLogout }: { onLogout: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false); // Novo estado para recolher
  const router = useRouter();
  const pathname = usePathname(); // Detecta rota atual

  // Define as rotas para cada item
  const navItems = [
    { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { label: "Usuários", icon: <PeopleIcon />, path: "/user" },
    { label: "Início", icon: <HomeIcon />, path: "/" },
    { label: "Configurações", icon: <SettingsIcon />, path: null, onClick: () => alert("Configurações em breve!") },
    { label: "Sobre", icon: <InfoIcon />, path: null, onClick: () => alert("Sobre o sistema!") },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCollapseToggle = () => {
    setCollapsed((prev) => !prev);
  };

  const drawer = (
    <Box sx={{ bgcolor: "#1E1E1E", height: "100%", color: "#fff", p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: collapsed ? 64 : navWidth, transition: 'width 0.2s' }}>
      <div>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'space-between', mb: 2 }}>
          <Typography variant="h6" fontWeight={700} fontFamily="Poppins, sans-serif" sx={{ display: collapsed ? 'none' : 'block' }}>
            Painel
          </Typography>
          <IconButton onClick={handleCollapseToggle} size="small" sx={{ color: '#fff', ml: collapsed ? 0 : 1 }}>
            <MenuIcon sx={{ transform: collapsed ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
          </IconButton>
        </Box>
        <List>
          {navItems.map((item, idx) => {
            const selected = item.path && pathname.startsWith(item.path);
            return (
              <ListItem disablePadding key={item.label} sx={{ justifyContent: collapsed ? 'center' : 'flex-start' }}>
                <ListItemButton
                  selected={!!selected}
                  onClick={item.path ? () => router.push(item.path!) : item.onClick}
                  sx={{ borderRadius: 1, mb: 0.5, justifyContent: collapsed ? 'center' : 'flex-start', px: collapsed ? 1 : 2 }}
                >
                  <ListItemIcon sx={{ color: selected ? "#305BDD" : "#fff", minWidth: 0, mr: collapsed ? 0 : 2, justifyContent: 'center' }}>{item.icon}</ListItemIcon>
                  {!collapsed && <ListItemText primary={item.label} />}
                </ListItemButton>
              </ListItem>
            );
          })}
          <ListItem disablePadding sx={{ justifyContent: collapsed ? 'center' : 'flex-start' }}>
            <ListItemButton onClick={onLogout} sx={{ borderRadius: 1, mt: 2, justifyContent: collapsed ? 'center' : 'flex-start', px: collapsed ? 1 : 2 }}>
              <ListItemIcon sx={{ color: "#e74c3c", minWidth: 0, mr: collapsed ? 0 : 2, justifyContent: 'center' }}>
                <LogoutIcon />
              </ListItemIcon>
              {!collapsed && <ListItemText primary="Logout" />}
            </ListItemButton>
          </ListItem>
        </List>
      </div>
      {!collapsed && (
        <Typography variant="caption" color="#B0B8C1" align="center" sx={{ mt: 2, fontFamily: 'Poppins, sans-serif' }}>
          v1.6.1
        </Typography>
      )}
    </Box>
  );

  return (
    <>
      {/* Navbar para telas pequenas */}
      <Box sx={{ display: { xs: "block", md: "none" }, position: "fixed", top: 16, left: 16, zIndex: 1200 }}>
        <IconButton onClick={handleDrawerToggle} sx={{ color: "#fff" }}>
          <MenuIcon />
        </IconButton>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: navWidth,
              bgcolor: "#1E1E1E",
              color: "#fff",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      {/* Navbar para telas médias/grandes */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          width: collapsed ? 64 : navWidth,
          flexShrink: 0,
          transition: 'width 0.2s',
          [`& .MuiDrawer-paper`]: {
            width: collapsed ? 64 : navWidth,
            boxSizing: "border-box",
            bgcolor: "#1E1E1E",
            color: "#fff",
            borderRight: "none",
            transition: 'width 0.2s',
            overflowX: 'hidden',
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </>
  );
}
