import { ApiResponse } from "./../utils/ApiResponse";
import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import User from "../models/user.model";
import jwt from "jsonwebtoken";

const generateRefreshAndAccessToken = async (id: any) => {
  try {
    const user: any = await User.findById(id);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const token = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { token, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while creating access token and refresh token"
    );
  }
};

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
      throw new ApiError(400, "Please provide all the required fields");
    }

    if (password.length < 6) {
      throw new ApiError(400, "Password must be at least 6 characters");
    }

    if (!email.includes("@")) {
      throw new ApiError(400, "Please provide a valid email");
    }

    // Check if user already exists

    const existedUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existedUser) {
      throw new ApiError(400, "User already exists");
    }

    const user = await User.create({
      name,
      username: username.toLowerCase(),
      email,
      password,
    });

    res
      .status(201)
      .json(new ApiResponse(201, "User registered successfully", user));
  }
);

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new ApiError(400, "Please provide all the required fields");
  }

  const user = await User.findOne({ username });

  if (!user) {
    throw new ApiError(400, "User does not exist");
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new ApiError(400, "Invalid credentials");
  }

  const { token, refreshToken } = await generateRefreshAndAccessToken(user._id);

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .cookie("token", token, cookieOptions)
    .json(
      new ApiResponse(200, "User logged in successfully", {
        loggedInUser,
        token,
        refreshToken,
      })
    );
});

export const logoutUser = asyncHandler(async (req: any, res: Response) => {
  await User.findByIdAndUpdate(
    req.user._id,
    { $set: { refreshToken: null } },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .clearCookie("refreshToken", cookieOptions)
    .clearCookie("token", cookieOptions)
    .json(new ApiResponse(200, "User logged out successfully"));
});

export const refreshToken = asyncHandler(async (req: any, res: Response) => {
  console.log(req.cookies);
  const { refreshToken: refreshTokenFromCookie } = req.cookies;

  if (!refreshTokenFromCookie) {
    throw new ApiError(401, "Unauthorized");
  }

  const decoded: any = jwt.verify(
    refreshTokenFromCookie,
    process.env.JWT_REFRESH_TOKEN_SECRET!
  );

  const user = await User.findById(decoded.userId);

  if (!user) {
    throw new ApiError(401, "Invalid Token");
  }

  if (user.refreshToken !== refreshTokenFromCookie) {
    throw new ApiError(401, "Unauthorized");
  }

  const { token, refreshToken } = await generateRefreshAndAccessToken(user._id);

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .cookie("token", token, cookieOptions)
    .json(
      new ApiResponse(200, "Token refreshed successfully", {
        loggedInUser,
        token,
        refreshToken,
      })
    );
});
