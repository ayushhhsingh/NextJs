import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET: string = process.env.JWT_SECRET || "fallback-secret";

export interface TokenPayload {
  id: string;
  email: string;
  username: string;
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// Compare password with hash
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// Create JWT token
export function createToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRY || "1d",
  });
}

// Verify JWT token
export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

// Get token from cookies
export async function getTokenFromCookies(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value || null;
}

// Get current user from token
export async function getCurrentUser(): Promise<TokenPayload | null> {
  const token = await getTokenFromCookies();
  if (!token) return null;
  return verifyToken(token);
}

// Generate verification code
export function generateVerifyCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Get verification code expiry (1 hour from now)
export function getVerifyCodeExpiry(): Date {
  return new Date(Date.now() + 3600000);
}
