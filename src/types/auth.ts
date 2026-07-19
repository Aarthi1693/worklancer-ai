export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
  role: "PROVIDER" | "MASTER";
}

export interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  email: string;
  newPassword: string;
}

export interface MessageResponse {
  message: string;
}