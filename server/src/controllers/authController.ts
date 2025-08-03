import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { successResponse, errorResponse } from "../utils/responseHelper";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json(errorResponse("User already exists"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    res.status(201).json(
      successResponse("User registered successfully", {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      })
    );
  } catch (error) {
    res.status(500).json(errorResponse("Internal server error"));
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json(errorResponse("User not found"));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json(errorResponse("Invalid credentials"));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });

    res.status(200).json(successResponse("Login successful", { token }));
  } catch (error) {
    res.status(500).json(errorResponse("Internal server error"));
  }
};
