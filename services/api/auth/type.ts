/**
 * Auth module type definitions
 */

export interface LoginRequest {
  type: "google-oauth2" | "github" | "linkedin" | "discord";
}

export interface AuthenticateRequest {
  token: string;
}

export interface AuthenticateResponse {
  token: string;
}

export interface LoginResponse {
  // Swagger returns Unit, might actually be redirect URL
  url?: string;
}
