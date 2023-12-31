import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";

export const verifyJWT = asyncHandler(
  async (req: any, _res: Response, next: NextFunction) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new ApiError(401, "Unauthorized");
    }

    // Verify token
    const decoded: any = jwt.verify(
      token,
      process.env.JWT_ACCESS_TOKEN_SECRET!
    );

    // Check if user exists

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      throw new ApiError(401, "Invalid Token");
    }

    req.user = user;

    next();
  }
);
