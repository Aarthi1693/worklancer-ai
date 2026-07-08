export interface User {
  id: string;
  name: string;
  email: string;
  role: "PROVIDER" | "MASTER" | "ADMIN";
}