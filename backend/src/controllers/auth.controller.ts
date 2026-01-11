import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
  loginUser,
  logout,
  refreshToken,
  registerUser
} from "../services/auth.service.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const options = {
  httpOnly: true,
  secure: true,
};

export const registerController = async (req: Request, res: Response) => {
  const user = await registerUser(req.body);

  res
    .status(201)
    .json(new ApiResponse(200, "User registered successfully", user));
};

export const loginController = async (req: Request, res: Response) => {
  const { user, accessToken, savedRefreshToken } = await loginUser(req.body);

  res
    .cookie("accesstoken", accessToken, options)
    .cookie("refreshtoken", savedRefreshToken.tokenHash, options);

  res.status(200).json(
    new ApiResponse(200, "Logged in Successfully", {
      user,
      accessToken,
      refreshToken: savedRefreshToken.tokenHash,
    })
  );
};

export const loggoutControler = async (req: Request, res: Response) => {
  const user = req.user;

  await logout(user);

  res.clearCookie("accesstoken", options).clearCookie("refreshtoken", options);
};

export const refreshController = async (req: Request, res: Response) => {
  const incomingRefreshToken =
    req.cookies.refreshtoken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Refresh token missing");
  }

  // Verify JWT
  let decoded: { userId: string };
  try {
    decoded = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    ) as { userId: string };
  } catch (err) {
    throw new ApiError(401, "Invalid or expired refresh token");
  }

  const { user, accessToken, refreshToken:rt } = await refreshToken({
    userId: decoded.userId,
    refreshToken: incomingRefreshToken,
  });

  res
    .cookie("accesstoken", accessToken, options)
    .cookie("refreshtoken", rt, options);

  res.status(200).json(
    new ApiResponse(200, "Access token refreshed successfully", {
      user,
      accessToken,
      refreshToken:rt,
    })
  );
};

