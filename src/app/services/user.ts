import { User } from "../types/user";

const API = process.env.NEXT_PUBLIC_API_URL + "/api/v1/User";

export async function fetchUsers() {
  const res = await fetch(`${API}/FetchUsers`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
}

export async function registerUser(user: Partial<User>) {
  const res = await fetch(`${API}/RegisterUser`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return res.json();
}

export async function editUser(id: number, user: Partial<User>, token: string) {
  const res = await fetch(`${API}/EditUser/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  });
  return res.json();
}

export async function deleteUser(id: number, token: string) {
  const res = await fetch(`${API}/DeleteUser/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}
