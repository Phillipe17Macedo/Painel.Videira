export interface User {
  Id_User: number;
  Name: string;
  Cpf: string;
  Login: string;
  Password?: string;
  Date_Nasc?: string;
  Age?: number;
  Gender?: number;
  Email?: string;
  Phone_1?: string;
  Phone_2?: string;
  Num_Location?: number;
  Street?: string;
  City?: string;
  Cep?: string;
  Func_Church?: number;
  Status?: boolean;
  Url_Image?: string | null;
}
