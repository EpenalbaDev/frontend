import api from "./client";
import Cookies from "js-cookie";
import { 
  UserLogin, 
  Token, 
  AuthUserCreate, 
  AuthUserResponse, 
  CurrentUser 
} from "@/types";

// Authentication service
export const authService = {
  // Login user
  async login(credentials: UserLogin): Promise<Token> {
    const response = await api.post("/auth/login", credentials);
    const { access_token, refresh_token } = response.data;
    
    // Store tokens in cookies
    Cookies.set("access_token", access_token, { expires: 1 });
    Cookies.set("refresh_token", refresh_token, { expires: 7 });
    
    return response.data;
  },

  // Login with JSON (alternative endpoint)
  async loginJson(credentials: UserLogin): Promise<Token> {
    const response = await api.post("/auth/login-json", credentials);
    const { access_token, refresh_token } = response.data;
    
    // Store tokens in cookies
    Cookies.set("access_token", access_token, { expires: 1 });
    Cookies.set("refresh_token", refresh_token, { expires: 7 });
    
    return response.data;
  },

  // Register new user
  async register(userData: AuthUserCreate): Promise<AuthUserResponse> {
    const response = await api.post("/auth/register", userData);
    return response.data;
  },

  // Get current user profile
  async getCurrentUser(): Promise<CurrentUser> {
    const response = await api.get("/auth/me");
    return response.data;
  },

  // Logout user
  async logout(): Promise<void> {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      // Continue with logout even if API call fails
      console.warn("Logout API call failed, continuing with local cleanup");
    } finally {
      // Clear tokens from cookies
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
    }
  },

  // Refresh access token
  async refreshToken(): Promise<Token> {
    const refresh_token = Cookies.get("refresh_token");
    if (!refresh_token) {
      throw new Error("No refresh token available");
    }

    const response = await api.post("/auth/refresh", { refresh_token });
    const { access_token, refresh_token: new_refresh_token } = response.data;
    
    // Update tokens in cookies
    Cookies.set("access_token", access_token, { expires: 1 });
    Cookies.set("refresh_token", new_refresh_token, { expires: 7 });
    
    return response.data;
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!Cookies.get("access_token");
  },

  // Get access token
  getAccessToken(): string | undefined {
    return Cookies.get("access_token");
  },

  // Get refresh token
  getRefreshToken(): string | undefined {
    return Cookies.get("refresh_token");
  }
};

// Export individual functions for backward compatibility
export const login = authService.login;
export const loginJson = authService.loginJson;
export const register = authService.register;
export const getCurrentUser = authService.getCurrentUser;
export const logout = authService.logout;
export const refreshToken = authService.refreshToken;
export const isAuthenticated = authService.isAuthenticated; 