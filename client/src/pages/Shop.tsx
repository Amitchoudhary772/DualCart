import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@shared/schema";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Shop() {
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  // Filter and sort products
  const filteredProducts = products
    .filter(product => category === "all" || product.category === category)
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return parseFloat(a.price) - parseFloat(b.price);
        case "price-high":
          return parseFloat(b.price) - parseFloat(a.price);
        case "newest":
          return new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime();
        default:
          return b.featured ? 1 : -1;
      }
    });

  const categories = Array.from(new Set(products.map(p => p.category).filter(Boolean)));

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Page Header */}
      <section className="bg-gradient-to-br from-black to-red-900 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6">
              Our <span className="text-red-400">Shop</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-200 max-w-3xl mx-auto">
              Quality products at best prices - सभी latest items यहाँ मिलेंगे!
            </p>
          </div>
        </div>
      </section>
      
      {/* Filters */}
      <section className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Showing {filteredProducts.length} Products
            </h2>
            <div className="flex space-x-4">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat!}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by Featured" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Sort by: Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No products found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
