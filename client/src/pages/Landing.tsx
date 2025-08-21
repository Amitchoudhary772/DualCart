import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/ProductCard";
import AffiliateCard from "@/components/AffiliateCard";
import type { Product, AffiliateDeal } from "@shared/schema";

export default function Landing() {
  const { data: featuredProducts = [] } = useQuery<Product[]>({
    queryKey: ['/api/products/featured'],
  });

  const { data: affiliateDeals = [] } = useQuery<AffiliateDeal[]>({
    queryKey: ['/api/affiliate-deals'],
  });

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black to-red-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-transparent to-red-800/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-red-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-red-600/15 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-black mb-6 lg:mb-8 text-white leading-tight">
              <span className="text-red-500">Digital</span> Aryan <span className="text-red-500">21</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl mb-8 lg:mb-12 max-w-4xl mx-auto text-gray-200 font-medium">
              अपने लिए बेस्ट टेक्नोलॉजी चुनें • Premium Quality Products • Affordable Prices
            </p>
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-8 justify-center items-center">
              <Button 
                className="bg-red-600 text-white px-8 lg:px-12 py-3 lg:py-4 text-base lg:text-lg font-bold hover:bg-red-700 transition-all duration-300 shadow-lg w-full sm:w-auto"
                onClick={() => window.location.href = "/shop"}
              >
                Shop Now
              </Button>
              <Button 
                className="bg-transparent border-2 border-red-500 text-red-400 px-8 lg:px-12 py-3 lg:py-4 text-base lg:text-lg font-bold hover:bg-red-600 hover:text-white transition-all duration-300 w-full sm:w-auto"
                onClick={() => window.location.href = "/deals"}
              >
                Best Deals
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 lg:mb-6">
              Best Selling Products
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              High quality products at best prices - जो आपको चाहिए, वो यहाँ मिलेगा
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Affiliate Deals */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 lg:mb-6">
              Special <span className="text-red-600">Deals</span>
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Limited time offers से मिलेगी extra savings - Don't miss out!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {affiliateDeals.slice(0, 3).map((deal) => (
              <AffiliateCard key={deal.id} deal={deal} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About ShopMart</h2>
              <p className="text-lg text-gray-600 mb-6">
                We're revolutionizing online shopping by combining our curated product collection with exclusive affiliate deals. Our mission is to provide customers with the best value and variety in one convenient platform.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">5000+</div>
                  <div className="text-gray-600">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">50k+</div>
                  <div className="text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">100+</div>
                  <div className="text-gray-600">Partner Brands</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">25+</div>
                  <div className="text-gray-600">Countries</div>
                </div>
              </div>
              <div className="flex space-x-4">
                <Button className="bg-primary text-white px-6 py-3 hover:bg-blue-700">
                  Learn More
                </Button>
                <Button variant="outline" className="border-primary text-primary px-6 py-3 hover:bg-primary hover:text-white">
                  Our Story
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" 
                alt="Our Team" 
                className="rounded-lg shadow-lg"
              />
              <img 
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" 
                alt="Customer Service" 
                className="rounded-lg shadow-lg mt-8"
              />
              <img 
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" 
                alt="Warehouse" 
                className="rounded-lg shadow-lg -mt-8"
              />
              <img 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" 
                alt="Quality Control" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
