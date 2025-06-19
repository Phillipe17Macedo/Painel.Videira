import { Box, Paper, Typography } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const cards = [
  {
    label: "Usuários Ativos",
    value: 1280,
    icon: <PeopleIcon fontSize="large" sx={{ color: "#305BDD" }} />,
    color: "#1E1E1E",
  },
  {
    label: "Crescimento (%)",
    value: "+12.5%",
    icon: <TrendingUpIcon fontSize="large" sx={{ color: "#41BF78" }} />,
    color: "#1E1E1E",
  },
  {
    label: "Queda (%)",
    value: "-2.1%",
    icon: <TrendingDownIcon fontSize="large" sx={{ color: "#e74c3c" }} />,
    color: "#1E1E1E",
  },
  {
    label: "Receita (R$)",
    value: "R$ 15.200",
    icon: <AttachMoneyIcon fontSize="large" sx={{ color: "#F2C94C" }} />,
    color: "#1E1E1E",
  },
];

export default function SummaryCards() {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 3,
        mb: 5,
        justifyContent: { xs: "center", md: "flex-start" },
      }}
    >
      {cards.map((card) => (
        <Paper
          key={card.label}
          sx={{
            bgcolor: card.color,
            p: { xs: 2, sm: 3 },
            minWidth: { xs: 140, sm: 180, md: 200 },
            maxWidth: { xs: "100%", sm: 250 },
            flex: { xs: "1 1 140px", sm: "1 1 180px", md: "1 1 200px" },
            display: "flex",
            alignItems: "center",
            gap: 2,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          {card.icon}
          <Box>
            <Typography variant="subtitle2" color="#B0B8C1" fontWeight={500}>
              {card.label}
            </Typography>
            <Typography variant="h6" fontWeight={700} color="#fff">
              {card.value}
            </Typography>
          </Box>
        </Paper>
      ))}
    </Box>
  );
}
