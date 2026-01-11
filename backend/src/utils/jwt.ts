import jwt, { type SignOptions, type Secret } from "jsonwebtoken";
import type ms from "ms";

const JWT_SECRET: Secret = process.env.JWT_SECRET!;
const REFRESH_TOKEN_SECRET: Secret = process.env.REFRESH_TOKEN_SECRET!;

if (!JWT_SECRET || !REFRESH_TOKEN_SECRET) {
  throw new Error("JWT secrets are not defined");
}

const JWT_SECRET_EXPIRES: SignOptions["expiresIn"] = process.env
  .JWT_SECRET_EXPIRES! as ms.StringValue;
const REFRESH_TOKEN_SECRET_EXPIRES: SignOptions["expiresIn"] = process.env
  .REFRESH_TOKEN_SECRET_EXPIRES! as ms.StringValue;

interface AccessTokenPayload {
  userId: string;
  email: string;
}

interface RefreshTokenPayload {
  userId: string;
}

export const generateAccessToken = (payload: AccessTokenPayload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_SECRET_EXPIRES,
  });
};

export const generateRefreshToken = (payload: RefreshTokenPayload) => {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_SECRET_EXPIRES,
  });
};
