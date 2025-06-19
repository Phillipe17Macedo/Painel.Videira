const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://localhost:7010";

export interface LoginResponse {
  success: boolean;
  data?: {
    accessToken: string;
    [key: string]: any;
  };
  message?: string;
}

export async function loginUser(login: string, password: string): Promise<LoginResponse> {
  const url = `${apiUrl}/api/v1/User/LoginUser/${encodeURIComponent(login)}/${encodeURIComponent(password)}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}
