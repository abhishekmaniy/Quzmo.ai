import type { Request, Response, NextFunction } from "express";
import { ZodError, ZodObject } from "zod";
import { ApiError } from "../utils/ApiError.js";

export const validateRequest =
  (schema: ZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ApiError(400, "Validation failed", error.flatten());
      }
      next(error);
    }
  };
