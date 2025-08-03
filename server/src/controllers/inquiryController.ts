import { Request, Response } from "express";
import Inquiry from "../models/Inquiry";
import { successResponse, errorResponse } from "../utils/responseHelper";

export const createInquiry = async (req: Request, res: Response) => {
  try {
    const { product, buyerEmail, message } = req.body;

    const inquiry = await Inquiry.create({ product, buyerEmail, message });

    res.status(201).json(
      successResponse("Inquiry created successfully", {
        id: inquiry._id,
        product: inquiry.product,
        buyerEmail: inquiry.buyerEmail,
        message: inquiry.message,
        createdAt: inquiry.createdAt,
      })
    );
  } catch (err: any) {
    res.status(500).json(errorResponse("Internal server error", err.message));
  }
};

export const getInquiriesByProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const inquiries = await Inquiry.find({ product: productId });

    res.json(successResponse("Inquiries retrieved successfully", inquiries));
  } catch (err: any) {
    res.status(500).json(errorResponse("Internal server error", err.message));
  }
};
