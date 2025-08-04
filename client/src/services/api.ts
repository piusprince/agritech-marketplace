import axios from "axios";
import type { ApiResponse, Product, Inquiry, InquiryForm } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const productService = {
  getProducts: async (): Promise<ApiResponse<Product[]>> => {
    const response = await api.get("/api/products");
    return response.data;
  },

  getProduct: async (id: string): Promise<ApiResponse<Product>> => {
    const response = await api.get(`/api/products/${id}`);
    return response.data;
  },
};

export const inquiryService = {
  createInquiry: async (
    productId: string,
    inquiryData: InquiryForm
  ): Promise<ApiResponse<Inquiry>> => {
    const response = await api.post("/api/inquiries", {
      product: productId,
      ...inquiryData,
    });
    return response.data;
  },

  getInquiriesForProduct: async (
    productId: string
  ): Promise<ApiResponse<Inquiry[]>> => {
    const response = await api.get(`/api/inquiries/${productId}`);
    return response.data;
  },
};

export default api;
