import { prisma } from "../lib/prisma.js";
import { ApiError } from "../utils/ApiError.js";
import { hashPassword } from "../utils/hash.js";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import type { User } from "../generated/prisma/client.js";
import type { Request } from "express";

interface RegisterInput {
  fullName: string;
  email: string;
  password: string;
}

export const registerUser = async ({
  fullName,
  email,
  password,
}: RegisterInput) => {
  // 1. Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  // 2. Hash password
  const hashedPassword = await hashPassword(password);

  // 3. Create user
  const user = await prisma.user.create({
    data: {
      fullName,
      email,
      passwordHash: hashedPassword,
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      createdAt: true,
    },
  });

  return user;
};

interface LoginInput {
  email: string;
  password: string;
}

export const loginUser = async ({ email, password }: LoginInput) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash!);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  const accessToken = generateAccessToken({
    userId: user.id,
    email: user.email,
  });

  const refreshToken = generateRefreshToken({
    userId: user.id,
  });

  // Save refresh token
  const savedRefreshToken = await prisma.refreshToken.create({
    data: {
      tokenHash: refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  if (!savedRefreshToken) {
    throw new ApiError(
      400,
      "Something went wrong while generating refreshToken"
    );
  }

  return {
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
    },
    accessToken,
    savedRefreshToken,
  };
};

export const logout = async (user: User) => {
  const dbUser = await prisma.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) {
    throw new ApiError(400, "User Not Found");
  }

  await prisma.refreshToken.deleteMany({
    where: {
      userId: dbUser.id,
    },
  });
};

export const refreshToken = async ({
  userId,
  refreshToken,
}: {
  userId: string;
  refreshToken: string;
}) => {
  // 1. Find token in DB
  const storedToken = await prisma.refreshToken.findFirst({
    where: {
      userId,
      tokenHash: refreshToken,
    },
    include: {
      user: true,
    },
  });

  if (!storedToken) {
    throw new ApiError(401, "Refresh token not recognized");
  }

  // 2. Check expiry
  if (storedToken.expiresAt < new Date()) {
    await prisma.refreshToken.delete({
      where: { id: storedToken.id },
    });
    throw new ApiError(401, "Refresh token expired");
  }

  const user = storedToken.user;

  // 3. Rotate refresh token (delete old)
  await prisma.refreshToken.delete({
    where: { id: storedToken.id },
  });

  // 4. Generate new tokens
  const newAccessToken = generateAccessToken({
    userId: user.id,
    email: user.email,
  });

  const newRefreshToken = generateRefreshToken({
    userId: user.id,
  });

  // 5. Save new refresh token
  await prisma.refreshToken.create({
    data: {
      tokenHash: newRefreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
    },
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};
