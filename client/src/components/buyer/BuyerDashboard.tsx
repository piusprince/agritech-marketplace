import { useState, useEffect } from "react";
import { LogOut, Search, Filter } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import ProductCard from "../ProductCard";
import InquiryModal from "../InquiryModal";
import { productService } from "../../services/api";
import LoadingSpinner from "../LoadingSpinner";
import type { Product } from "../../types";
import { toast } from "sonner";

export default function BuyerDashboard() {
  const { user, logout } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, selectedCategory]);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const response = await productService.getProducts();
      if (response.success && response.data) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error("Error loading products:", error);
      toast.error("Failed to load products");
    } finally {
      setIsLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) =>
          product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setFilteredProducts(filtered);
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  const handleInquireAboutProduct = (product: Product) => {
    setSelectedProduct(product);
    setShowInquiryModal(true);
  };

  const handleInquiryModalClose = () => {
    setShowInquiryModal(false);
    setSelectedProduct(null);
  };

  const categories = [
    "all",
    ...Array.from(new Set(products.map((p) => p.category.toLowerCase()))),
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">🌾 FarmDirect</h1>
              <span className="ml-4 text-gray-500">Marketplace</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Welcome, {user?.name}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Fresh Produce Direct from Farmers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover high-quality, fresh produce directly from local farmers.
            Support your community while getting the best prices.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search products, categories, or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all"
                    ? "All Categories"
                    : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="text-center py-6">
              <div className="text-2xl font-bold text-green-600">
                {products.length}
              </div>
              <p className="text-sm text-gray-600">Products Available</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center py-6">
              <div className="text-2xl font-bold text-green-600">
                {
                  new Set(
                    products.map((p) =>
                      typeof p.farmer === "string" ? p.farmer : p.farmer.id
                    )
                  ).size
                }
              </div>
              <p className="text-sm text-gray-600">Active Farmers</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center py-6">
              <div className="text-2xl font-bold text-green-600">
                {categories.length - 1}
              </div>
              <p className="text-sm text-gray-600">Categories</p>
            </CardContent>
          </Card>
        </div>

        {/* Products Grid */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Available Products ({filteredProducts.length})
          </h3>

          {filteredProducts.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm || selectedCategory !== "all"
                    ? "No products match your search"
                    : "No products available"}
                </h3>
                <p className="text-gray-600">
                  {searchTerm || selectedCategory !== "all"
                    ? "Try adjusting your search terms or filters"
                    : "Check back later for new products from farmers"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product._id} className="relative">
                  <ProductCard product={product} />
                  <Button
                    onClick={() => handleInquireAboutProduct(product)}
                    className="mt-3 w-full bg-green-600 hover:bg-green-700"
                  >
                    Inquire About This Product
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Inquiry Modal */}
      {selectedProduct && (
        <InquiryModal
          isOpen={showInquiryModal}
          onClose={handleInquiryModalClose}
          product={selectedProduct}
        />
      )}
    </div>
  );
}
