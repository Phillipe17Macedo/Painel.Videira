"use client";
import { useState } from "react";
import "@fontsource/poppins";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/navigation";
import { loginUser } from "./services/auth"; // Ajuste o caminho conforme necessário

export default function Login() {
  const router = useRouter();
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!login || !senha) {
      setErro("Preencha todos os campos.");
      return;
    }
    setErro("");
    try {
      const res = await loginUser(login, senha);
      if (res.success && res.data?.accessToken) {
        sessionStorage.setItem("token", res.data.accessToken);
        router.push("/dashboard");
      } else {
        setErro(res.message || "Usuário ou senha inválidos.");
      }
    } catch (err) {
      setErro("Erro ao conectar com o servidor.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#121212",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          bgcolor: "#1E1E1E",
          p: { xs: 3, sm: 5 }, // padding responsivo
          width: { xs: "90%", sm: 500 }, // largura ajustável em mobile
          borderRadius: 2,
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          fontFamily: "Poppins, sans-serif",
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          mb={1}
          color="#fff"
          fontFamily="Poppins, sans-serif"
        >
          Login
        </Typography>
        <Typography
          variant="subtitle1"
          fontWeight={500}
          color="#fff"
          mb={0.5}
          fontFamily="Poppins, sans-serif"
        >
          Nome
        </Typography>
        <TextField
          id="login"
          placeholder="Digite seu nome"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          autoComplete="username"
          fullWidth
          variant="outlined"
          InputProps={{
            style: {
              background: "#121212",
              color: "#fff",
              borderRadius: 6,
              fontFamily: "Poppins, sans-serif",
            },
          }}
          sx={{
            mb: 2,
            input: { color: "#fff" },
            label: { color: "#fff" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#333" },
              "&:hover fieldset": { borderColor: "#305BDD" },
              "&.Mui-focused fieldset": { borderColor: "#305BDD" },
            },
          }}
        />
        <Typography
          variant="subtitle1"
          fontWeight={500}
          color="#fff"
          mb={0.5}
          fontFamily="Poppins, sans-serif"
        >
          Senha
        </Typography>
        <TextField
          id="senha"
          type={showPassword ? "text" : "password"}
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          autoComplete="current-password"
          fullWidth
          variant="outlined"
          InputProps={{
            style: {
              background: "#121212",
              color: "#fff",
              borderRadius: 6,
              fontFamily: "Poppins, sans-serif",
            },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((s) => !s)}
                  edge="end"
                  tabIndex={-1}
                  sx={{ color: "#fff" }}
                >
                  <VisibilityOffIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 2,
            input: { color: "#fff" },
            label: { color: "#fff" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#333" },
              "&:hover fieldset": { borderColor: "#305BDD" },
              "&.Mui-focused fieldset": { borderColor: "#305BDD" },
            },
          }}
        />
        {erro && (
          <Typography
            color="#e74c3c"
            fontSize={15}
            mb={1}
            fontFamily="Poppins, sans-serif"
          >
            {erro}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            bgcolor: "#305BDD",
            color: "#fff",
            fontWeight: 600,
            fontSize: 18,
            borderRadius: 1.5,
            py: 1.5,
            mt: 1,
            mb: 1,
            fontFamily: "Poppins, sans-serif",
            boxShadow: "0 1px 4px 0 #0002",
            "&:hover": { bgcolor: "#294273" },
          }}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
}
