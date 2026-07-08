import Cookies from "js-cookie";
import api from "@/lib/api";
import {
  LoginDto,
  RegisterDto,
  LoginResponse,
} from "@/types/auth";

class AuthService {
  async login(data: LoginDto): Promise<LoginResponse> {
    console.log("Calling backend login API...");

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

  async register(data: RegisterDto) {
    const response = await api.post(
      "/auth/register",
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

  getToken() {
    return Cookies.get("access_token");
  }

  isAuthenticated() {
    return !!Cookies.get("access_token");
  }
}

export default new AuthService();