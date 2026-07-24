import Cookies from "js-cookie";
import api from "@/lib/api";
import {
  LoginDto,
  RegisterDto,
  LoginResponse,
  ForgotPasswordDto,
  ResetPasswordDto,
  MessageResponse,
} from "@/types/auth";

class AuthService {
  async login(data: LoginDto): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>(
      "/auth/login",
      data
    );

    Cookies.set("access_token", response.data.access_token);

    Cookies.set(
      "user",
      JSON.stringify(response.data.user)
    );

    return response.data;
  }

  async   register(data: RegisterDto) {
    const response = await api.post(
      "/auth/register",
      data
    );

    return response.data;
  }

  async forgotPassword(data: ForgotPasswordDto): Promise<MessageResponse> {
    const response = await api.post<MessageResponse>(
      "/auth/forgot-password",
      data
    );

    return response.data;
  }

  async resetPassword(data: ResetPasswordDto): Promise<MessageResponse> {
    const response = await api.post<MessageResponse>(
      "/auth/reset-password",
      data
    );

    return response.data;
  }

  logout() {
    Cookies.remove("access_token");
    Cookies.remove("user");
  }

  getUser() {
    const user = Cookies.get("user");

    if (!user) return null;

    return JSON.parse(user);
  }

  setUser(user: { id: string; name: string; email: string; role: string; [key: string]: unknown }) {
    Cookies.set("user", JSON.stringify(user));
  }

  getToken() {
    return Cookies.get("access_token");
  }

  isAuthenticated() {
    return !!Cookies.get("access_token");
  }
}

const authService = new AuthService();

export default authService;