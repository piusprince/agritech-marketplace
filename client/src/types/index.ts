export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, unknown>[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "farmer" | "buyer";
  createdAt: string;
}

export interface Product {
  _id: string;
  farmer: User | string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface Inquiry {
  id: string;
  product: string;
  buyerEmail: string;
  message: string;
  createdAt: string;
}

export interface InquiryForm {
  buyerEmail: string;
  message: string;
}
