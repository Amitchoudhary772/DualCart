import { useAuth } from "@/hooks/useAuth";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/ProductCard";
import AffiliateCard from "@/components/AffiliateCard";
import type { Product, AffiliateDeal } from "@shared/schema";
import { Link } from "wouter";

export default function Home() {
  const { user } = useAuth();
  
  const { data: featuredProducts = [] } = useQuery<Product[]>({
    queryKey: ['/api/products/featured'],
  });

  const { data: affiliateDeals = [] } = useQuery<AffiliateDeal[]>({
    queryKey: ['/api/affiliate-deals'],
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      {/* Welcome Banner */}
      <section className="bg-gradient-to-r from-primary to-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">
              Welcome back, {user?.firstName || user?.email || 'User'}!
            </h1>
            <p className="text-xl mb-6">
              Discover new products and amazing deals just for you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop">
                <Button className="bg-white text-primary px-6 py-3 hover:bg-gray-100">
                  Browse Products
                </Button>
              </Link>
              <Link href="/deals">
                <Button className="bg-accent text-white px-6 py-3 hover:bg-yellow-500">
                  View Deals
                </Button>
              </Link>
              {user?.isAdmin && (
                <Link href="/admin">
                  <Button variant="outline" className="border-white text-white px-6 py-3 hover:bg-white hover:text-primary">
                    Admin Panel
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-lg text-gray-600">Handpicked items from our exclusive collection</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/shop">
              <Button className="bg-primary text-white px-8 py-3 hover:bg-blue-700">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Deals */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Deals</h2>
            <p className="text-lg text-gray-600">Don't miss these exclusive offers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {affiliateDeals.slice(0, 3).map((deal) => (
              <AffiliateCard key={deal.id} deal={deal} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/deals">
              <Button className="bg-accent text-white px-8 py-3 hover:bg-yellow-500">
                View All Deals
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
