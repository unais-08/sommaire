"use server";

import { cookies } from "next/headers";
import { getDBConnection } from "@/lib/db";
import { SignJWT, jwtVerify } from "jose";
import crypto from "crypto";

// ─── Config ────────────────────────────────────────────────────
const TOKEN_COOKIE = "token";
const LOGGED_IN_COOKIE = "is_logged_in";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not defined in .env");
  return new TextEncoder().encode(secret);
}

// ─── Password helpers ──────────────────────────────────────────
function hashPassword(password: string, salt: string): string {
  return crypto
    .pbkdf2Sync(password, salt, 100000, 64, "sha512")
    .toString("hex");
}

function generateSalt(): string {
  return crypto.randomBytes(16).toString("hex");
}

// ─── JWT helpers ───────────────────────────────────────────────
async function createToken(payload: {
  id: string;
  email: string;
  fullName: string;
}) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(getJwtSecret());
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
    return payload as { id: string; email: string; fullName: string };
  } catch {
    return null;
  }
}

// ─── Cookie helpers ────────────────────────────────────────────
async function setAuthCookies(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_AGE,
    path: "/",
  });
  cookieStore.set(LOGGED_IN_COOKIE, "true", {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_AGE,
    path: "/",
  });
}

async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.set(TOKEN_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
  cookieStore.set(LOGGED_IN_COOKIE, "", {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
}

// ─── Auth actions ──────────────────────────────────────────────
export async function signUp(
  email: string,
  password: string,
  fullName: string,
) {
  const sql = await getDBConnection();

  const existing = await sql`SELECT id FROM users WHERE email = ${email}`;
  if (existing.length > 0) {
    return {
      success: false,
      message: "An account with this email already exists.",
    };
  }

  const salt = generateSalt();
  const passwordHash = hashPassword(password, salt);

  try {
    const result = await sql`
      INSERT INTO users (email, password_hash, password_salt, full_name, status)
      VALUES (${email}, ${passwordHash}, ${salt}, ${fullName}, 'active')
      RETURNING id, email, full_name
    `;

    const user = result[0];
    const token = await createToken({
      id: user.id,
      email: user.email,
      fullName: user.full_name,
    });

    await setAuthCookies(token);

    return {
      success: true,
      user: { id: user.id, email: user.email, fullName: user.full_name },
    };
  } catch (error) {
    console.error("Sign up error:", error);
    return { success: false, message: "An error occurred during sign up." };
  }
}

export async function signIn(email: string, password: string) {
  const sql = await getDBConnection();

  try {
    const result =
      await sql`SELECT id, email, full_name, password_hash, password_salt FROM users WHERE email = ${email}`;
    if (result.length === 0) {
      return { success: false, message: "Invalid email or password." };
    }

    const user = result[0];
    const passwordHash = hashPassword(password, user.password_salt);

    if (passwordHash !== user.password_hash) {
      return { success: false, message: "Invalid email or password." };
    }

    const token = await createToken({
      id: user.id,
      email: user.email,
      fullName: user.full_name,
    });

    await setAuthCookies(token);

    return {
      success: true,
      user: { id: user.id, email: user.email, fullName: user.full_name },
    };
  } catch (error) {
    console.error("Sign in error:", error);
    return { success: false, message: "An error occurred during sign in." };
  }
}

export async function signOut() {
  await clearAuthCookies();
  return { success: true };
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_COOKIE)?.value;

  if (!token) return null;

  const payload = await verifyToken(token);
  if (!payload) return null;

  return {
    id: payload.id,
    email: payload.email,
    fullName: payload.fullName,
  };
}
