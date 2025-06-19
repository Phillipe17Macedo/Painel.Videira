"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  IconButton,
  Tooltip,
  Avatar,
  Skeleton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AuthGuard from "../components/AuthGuard";
import {
  fetchUsers,
  registerUser,
  editUser,
  deleteUser,
} from "../services/user";
import { User } from "../types/user";
import UserModal from "./UserModal";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";

// columnHelper and columns moved inside UserPage

export default function UserPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<Partial<User> | null>(null);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [isClient, setIsClient] = useState(false);

  const mapUser = (apiUser: any): User => ({
    Id_User: apiUser.id_User,
    Name: apiUser.name,
    Cpf: apiUser.cpf,
    Login: apiUser.login,
    Password: apiUser.password,
    Date_Nasc: apiUser.date_Nasc,
    Age: apiUser.age,
    Gender: apiUser.gender,
    Email: apiUser.email,
    Phone_1: apiUser.phone_1,
    Phone_2: apiUser.phone_2,
    Num_Location: apiUser.num_Location,
    Street: apiUser.street,
    City: apiUser.city,
    Cep: apiUser.cep,
    Func_Church: apiUser.func_Church,
    Status: apiUser.status,
    Url_Image: apiUser.url_Image,
  });

  const loadUsers = async () => {
    setLoading(true);
    const res = await fetchUsers();
    if (res.success && Array.isArray(res.data)) {
      setUsers(res.data.map(mapUser));
    } else {
      setUsers([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      loadUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClient]);

  const handleCreate = () => {
    setEditData(null);
    setModalMode("create");
    setModalOpen(true);
  };

  const handleEdit = (user: User) => {
    setEditData(user);
    setModalMode("edit");
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    const token = sessionStorage.getItem("token") || "";
    await deleteUser(id, token);
    setModalOpen(false);
    loadUsers();
  };

  const handleSave = async (data: Partial<User>) => {
    if (modalMode === "edit" && editData && editData.Id_User) {
      const token = sessionStorage.getItem("token") || "";
      await editUser(editData.Id_User, data, token);
    } else {
      await registerUser(data);
    }
    setModalOpen(false);
    loadUsers();
  };

  const columnHelper = createColumnHelper<User>();
  const columns = [
    columnHelper.accessor("Url_Image", {
      header: "Foto",
      cell: (info) => (
        <Avatar
          src={info.getValue() || undefined}
          alt={info.row.original.Name}
        />
      ),
    }),
    columnHelper.accessor("Name", { header: "Nome" }),
    columnHelper.accessor("Login", { header: "Login" }),
    columnHelper.accessor("Email", { header: "E-mail" }),
    columnHelper.accessor("Status", {
      header: "Status",
      cell: (info) => (info.getValue() ? "Ativo" : "Inativo"),
    }),
    columnHelper.display({
      id: "actions",
      header: "Ações",
      cell: (info) => (
        <>
          <Tooltip title="Editar">
            <IconButton
              onClick={() => handleEdit(info.row.original)}
              color="primary"
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Remover">
            <IconButton
              onClick={() => handleDelete(info.row.original.Id_User)}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    }),
  ];

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <AuthGuard>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "transparent",
          color: "#fff",
          fontFamily: "Poppins, sans-serif",
          p: { xs: 1, sm: 2, md: 4 },
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch", // Alterado de center para stretch
          justifyContent: "flex-start",
          width: "100%", // Garante que ocupe toda a largura
        }}
      >
        <Paper
          sx={{
            bgcolor: "#1E1E1E",
            p: { xs: 2, sm: 4 },
            borderRadius: 3,
            width: "100%", // Remove maxWidth e usa 100%
            mx: 0, // Remove margin horizontal
            mb: 4,
            boxShadow: 6,
            border: "1.5px solid #305BDD22",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{ color: "#305BDD", letterSpacing: 1 }}
            >
              Usuários
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreate}
              sx={{
                bgcolor: "#305BDD",
                fontWeight: 600,
                borderRadius: 2,
                fontFamily: "Poppins, sans-serif",
                boxShadow: 2,
                px: 3,
              }}
            >
              Novo Usuário
            </Button>
          </Box>
          {isClient && (
            <Box
              sx={{
                width: "100%",
                overflowX: "auto",
                bgcolor: "#181818",
                borderRadius: 2,
                boxShadow: 1,
                minHeight: 180,
                m: 0, // Remove qualquer margin
              }}
            >
              {loading ? (
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "separate",
                    borderSpacing: 0,
                  }}
                >
                  <thead>
                    <tr>
                      {columns.map((col, idx) => (
                        <th key={idx} style={{ padding: 12 }}>
                          <Skeleton variant="text" width={80} height={24} />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(5)].map((_, i) => (
                      <tr key={i}>
                        {columns.map((col, idx) => (
                          <td key={idx} style={{ padding: 12 }}>
                            <Skeleton
                              variant="rectangular"
                              width={80}
                              height={24}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "separate",
                    borderSpacing: 0,
                    color: "#FFFFFF",
                    fontFamily: "Poppins, sans-serif",
                    fontSize: 15,
                  }}
                >
                  <thead style={{ background: "#222" }}>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <th
                            key={header.id}
                            style={{
                              padding: 12,
                              borderBottom: "2px solid #305BDD55",
                              textAlign: "left",
                              fontWeight: 600,
                              letterSpacing: 0.5,
                              color: "#FFFFFF",
                              background: "#23263a",
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {table.getRowModel().rows.length === 0 ? (
                      <tr>
                        <td
                          colSpan={columns.length}
                          style={{
                            padding: 24,
                            textAlign: "center",
                            color: "#B0B8C1",
                          }}
                        >
                          Nenhum usuário encontrado.
                        </td>
                      </tr>
                    ) : (
                      table.getRowModel().rows.map((row, idx) => (
                        <tr
                          key={row.id}
                          style={{
                            borderBottom: "1.5px solid #23263a",
                            background: idx % 2 === 0 ? "#181c2f" : "#23263a",
                          }}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <td
                              key={cell.id}
                              style={{
                                padding: 12,
                                verticalAlign: "middle",
                                color: "#FFFFFF",
                              }}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </td>
                          ))}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </Box>
          )}
        </Paper>
        <UserModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          initialData={editData || {}}
          mode={modalMode}
        />
      </Box>
    </AuthGuard>
  );
}
