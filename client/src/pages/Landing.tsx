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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black via-amber-900/20 to-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-amber-600/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-amber-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center">
            <h1 className="text-5xl md:text-8xl font-serif font-black mb-8 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent leading-tight">
              Digital Aryan 21
            </h1>
            <p className="text-xl md:text-3xl mb-12 max-w-4xl mx-auto text-amber-100/90 font-light tracking-wide">
              Experience Ultra-Premium Digital Excellence • Luxury Technology Solutions • Exclusive Collections
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <Button 
                className="bg-gradient-to-r from-amber-500 to-yellow-600 text-black px-12 py-4 text-lg font-semibold hover:from-amber-400 hover:to-yellow-500 hover:scale-105 transition-all duration-300 shadow-2xl"
                onClick={() => window.location.href = "/shop"}
              >
                Explore Premium Collection
              </Button>
              <Button 
                className="bg-transparent border-2 border-amber-400 text-amber-300 px-12 py-4 text-lg font-semibold hover:bg-amber-400 hover:text-black hover:scale-105 transition-all duration-300"
                onClick={() => window.location.href = "/deals"}
              >
                Exclusive Offers
              </Button>
            </div>
            <div className="mt-12">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-black to-gray-900 border border-amber-500 text-amber-400 px-16 py-6 text-xl font-bold hover:bg-gradient-to-r hover:from-amber-500 hover:to-yellow-600 hover:text-black hover:scale-110 transition-all duration-500 shadow-2xl"
                onClick={() => window.location.href = "/auth"}
              >
                Enter Exclusive Access
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 border-t border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-serif font-bold bg-gradient-to-r from-amber-300 to-yellow-500 bg-clip-text text-transparent mb-6">Premium Collection</h2>
            <p className="text-xl text-amber-100/80 max-w-2xl mx-auto font-light">Meticulously curated luxury items that define excellence and sophistication</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Affiliate Deals */}
      <section className="py-24 bg-gradient-to-br from-black via-amber-900/10 to-black border-t border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-serif font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent mb-6">Exclusive Partnerships</h2>
            <p className="text-xl text-amber-100/80 max-w-2xl mx-auto font-light">Privileged access to ultra-premium deals from our elite brand partners</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
