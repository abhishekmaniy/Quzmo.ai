import type { NextFunction, Request, Response } from "express";
import { asyncHandler } from "./asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken"
import { prisma } from "../lib/prisma.js";

export const verifyJWT = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    
    if(!token) {
        throw new ApiError(401 , "Unauthorized request")
    }

    if (!process.env.JWT_SECRET) {
        throw new ApiError(500, "Internal Server Error")
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string }

    const user = prisma.user.findFirst({
        where:{
            id:decoded.id
        }
    })

    if (!user) {
        throw new ApiError(401 , "Invalid Access Token")
    }

    req.user = user;
    next()

  } 
);
