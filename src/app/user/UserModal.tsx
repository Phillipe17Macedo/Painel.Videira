"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  FormHelperText,
  InputAdornment,
  IconButton,
  Grid,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { User } from "../types/user";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Switch from "@mui/material/Switch";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

interface UserModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (user: Partial<User>) => void;
  initialData?: Partial<User>;
  mode: "create" | "edit";
}

export default function UserModal({
  open,
  onClose,
  onSave,
  initialData = {},
  mode,
}: UserModalProps) {
  const [form, setForm] = useState<Partial<User>>(initialData);
  const [errors, setErrors] = useState<any>({});
  const [showPassword, setShowPassword] = useState(false);

  // Preview da imagem
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData.Url_Image || null
  );
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    setForm(initialData);
    setErrors({});
  }, [initialData, open]);

  const validate = () => {
    const newErrors: any = {};
    if (!form.Name || form.Name.trim().length < 3)
      newErrors.Name = "Nome obrigatório (mín. 3 letras)";
    if (!form.Login || form.Login.trim().length < 3)
      newErrors.Login = "Login obrigatório (mín. 3 letras)";
    if (mode === "create" && (!form.Password || form.Password.length < 6))
      newErrors.Password = "Senha obrigatória (mín. 6 caracteres)";
    if (form.Email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.Email))
      newErrors.Email = "E-mail inválido";
    if (form.Cpf && !/^\d{11}$/.test(form.Cpf.replace(/\D/g, "")))
      newErrors.Cpf = "CPF deve ter 11 dígitos";
    return newErrors;
  };

  // Corrige o valor do status para string no Select
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    if (name === "Status") {
      setForm({ ...form, [name]: value === "true" });
    } else {
      setForm({ ...form, [name as string]: value });
    }
    setErrors({ ...errors, [name as string]: undefined });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = () => {
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    onSave(form);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: "#E8EEEE",
          borderRadius: 3,
          boxShadow: 8,
        },
      }}
    >
      <Box sx={{ p: 0 }}>
        <DialogTitle
          sx={{
            fontWeight: 700,
            color: "#305BDD",
            fontFamily: "Poppins, sans-serif",
            pb: 0,
            letterSpacing: 1,
            textAlign: "center",
          }}
        >
          {mode === "create" ? "Cadastrar Usuário" : "Editar Usuário"}
        </DialogTitle>
        <Divider sx={{ mb: 2, mt: 1, bgcolor: "#305BDD33" }} />
        <DialogContent
          sx={{
            p: { xs: 1, sm: 2, md: 2 },
            maxHeight: { md: 540, xs: "none" },
            overflow: "auto",
            bgcolor: "#E8EEEE",
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Avatar
              src={imagePreview || undefined}
              sx={{
                width: 80,
                height: 80,
                mb: 1,
                bgcolor: "#181c2f",
                border: "3px solid #305BDD",
                boxShadow: 2,
              }}
            />
            <Button
              variant="outlined"
              component="label"
              size="small"
              sx={{
                fontSize: 12,
                px: 2,
                py: 0.5,
                minWidth: 0,
                bgcolor: "#fff",
                color: "#305BDD",
                borderColor: "#305BDD",
                ":hover": { bgcolor: "#e8eefe" },
              }}
            >
              Trocar Foto
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </Button>
          </Box>
          <Divider sx={{ my: 2, bgcolor: "#305BDD33" }} />
          <Typography
            variant="subtitle2"
            sx={{
              color: "#B0B8C1",
              mb: 1,
              fontWeight: 600,
              letterSpacing: 1,
            }}
          >
            Dados Pessoais
          </Typography>
          <Grid container spacing={1.5} columns={12} sx={{ mb: 1 }}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Nome *"
                name="Name"
                value={form.Name || ""}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.Name}
                helperText={errors.Name}
                autoFocus
                placeholder="Ex: João da Silva"
                InputLabelProps={{ sx: { color: "#305BDD" } }}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="CPF"
                name="Cpf"
                value={form.Cpf || ""}
                onChange={handleChange}
                fullWidth
                error={!!errors.Cpf}
                helperText={errors.Cpf}
                inputProps={{ maxLength: 14 }}
                placeholder="Somente números"
                InputLabelProps={{ sx: { color: "#305BDD" } }}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Data Nasc."
                name="Date_Nasc"
                value={form.Date_Nasc || ""}
                onChange={handleChange}
                fullWidth
                type="date"
                InputLabelProps={{
                  shrink: true,
                  sx: { color: "#305BDD" },
                }}
                size="small"
              />
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <TextField
                label="Idade"
                name="Age"
                value={form.Age || ""}
                onChange={handleChange}
                fullWidth
                type="number"
                InputLabelProps={{ sx: { color: "#305BDD" } }}
                size="small"
              />
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ color: "#305BDD" }}>Gênero</InputLabel>
                <Select
                  label="Gênero"
                  name="Gender"
                  value={form.Gender || ""}
                  onChange={handleChange}
                  sx={{ color: "#fff" }}
                >
                  <MenuItem value="Masculino">Masculino</MenuItem>
                  <MenuItem value="Feminino">Feminino</MenuItem>
                  <MenuItem value="Outro">Outro</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2, bgcolor: "#305BDD33" }} />
          <Typography
            variant="subtitle2"
            sx={{
              color: "#B0B8C1",
              mb: 1,
              fontWeight: 600,
              letterSpacing: 1,
            }}
          >
            Contato
          </Typography>
          <Grid container spacing={1.5} columns={12} sx={{ mb: 1 }}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="E-mail"
                name="Email"
                value={form.Email || ""}
                onChange={handleChange}
                fullWidth
                error={!!errors.Email}
                helperText={errors.Email}
                type="email"
                placeholder="Ex: joao@email.com"
                InputLabelProps={{ sx: { color: "#305BDD" } }}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Telefone 1"
                name="Phone_1"
                value={form.Phone_1 || ""}
                onChange={handleChange}
                fullWidth
                placeholder="(99) 99999-9999"
                InputLabelProps={{ sx: { color: "#305BDD" } }}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Telefone 2"
                name="Phone_2"
                value={form.Phone_2 || ""}
                onChange={handleChange}
                fullWidth
                placeholder="(99) 99999-9999"
                InputLabelProps={{ sx: { color: "#305BDD" } }}
                size="small"
              />
            </Grid>
          </Grid>
          <Divider sx={{ my: 2, bgcolor: "#305BDD33" }} />
          <Typography
            variant="subtitle2"
            sx={{
              color: "#B0B8C1",
              mb: 1,
              fontWeight: 600,
              letterSpacing: 1,
            }}
          >
            Endereço
          </Typography>
          <Grid container spacing={1.5} columns={12} sx={{ mb: 1 }}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Rua"
                name="Street"
                value={form.Street || ""}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ sx: { color: "#305BDD" } }}
                size="small"
              />
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <TextField
                label="Nº"
                name="Num_Location"
                value={form.Num_Location || ""}
                onChange={handleChange}
                fullWidth
                type="number"
                InputLabelProps={{ sx: { color: "#305BDD" } }}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Cidade"
                name="City"
                value={form.City || ""}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ sx: { color: "#305BDD" } }}
                size="small"
              />
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <TextField
                label="CEP"
                name="Cep"
                value={form.Cep || ""}
                onChange={handleChange}
                fullWidth
                placeholder="00000-000"
                InputLabelProps={{ sx: { color: "#305BDD" } }}
                size="small"
              />
            </Grid>
          </Grid>
          <Divider sx={{ my: 2, bgcolor: "#305BDD33" }} />
          <Typography
            variant="subtitle2"
            sx={{
              color: "#B0B8C1",
              mb: 1,
              fontWeight: 600,
              letterSpacing: 1,
            }}
          >
            Acesso
          </Typography>
          <Grid container spacing={1.5} columns={12} sx={{ mb: 1 }}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Login *"
                name="Login"
                value={form.Login || ""}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.Login}
                helperText={errors.Login}
                placeholder="Ex: joaosilva"
                InputLabelProps={{ sx: { color: "#305BDD" } }}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Tooltip
                title={
                  mode === "create"
                    ? "A senha deve ter pelo menos 6 caracteres."
                    : "Deixe em branco para não alterar a senha."
                }
                arrow
              >
                <TextField
                  label={mode === "create" ? "Senha *" : "Senha (opcional)"}
                  name="Password"
                  value={form.Password || ""}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  required={mode === "create"}
                  error={!!errors.Password}
                  helperText={errors.Password}
                  placeholder={mode === "create" ? "Mínimo 6 caracteres" : ""}
                  InputLabelProps={{ sx: { color: "#305BDD" } }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((s) => !s)}
                          edge="end"
                          size="small"
                          tabIndex={-1}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  size="small"
                />
              </Tooltip>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Função"
                name="Func_Church"
                value={form.Func_Church || ""}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ sx: { color: "#305BDD" } }}
                size="small"
              />
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <FormControl fullWidth size="small" sx={{ mt: 0.5 }}>
                <InputLabel sx={{ color: "#305BDD" }}>Status</InputLabel>
                <Select
                  label="Status"
                  name="Status"
                  value={
                    form.Status === undefined ? "true" : String(form.Status)
                  }
                  onChange={handleChange}
                  sx={{ color: "#fff" }}
                >
                  <MenuItem value="true">Ativo</MenuItem>
                  <MenuItem value="false">Inativo</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <FormHelperText sx={{ color: "#e74c3c", mt: 1, minHeight: 24 }}>
            {String(Object.values(errors)[0] || "")}
          </FormHelperText>
        </DialogContent>
        <DialogActions
          sx={{
            px: 3,
            pb: 2,
            pt: 1,
            bgcolor: "#E8EEEE",
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
          }}
        >
          <Button
            onClick={onClose}
            variant="outlined"
            color="inherit"
            sx={{ borderRadius: 2, fontWeight: 500 }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              bgcolor: "#305BDD",
              fontWeight: 700,
              borderRadius: 2,
              px: 4,
              boxShadow: 2,
              ":hover": { bgcolor: "#2446a6" },
            }}
          >
            {mode === "create" ? "Cadastrar" : "Salvar"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
