import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import AffiliateCard from "@/components/AffiliateCard";
import type { AffiliateDeal } from "@shared/schema";

export default function AffiliateDeals() {
  const { data: deals = [], isLoading } = useQuery<AffiliateDeal[]>({
    queryKey: ['/api/affiliate-deals'],
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      {/* Page Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Exclusive Affiliate Deals</h1>
            <p className="text-lg text-gray-600">Amazing offers from our trusted partners</p>
          </div>
        </div>
      </section>

      {/* Deals Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading deals...</p>
            </div>
          ) : deals.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No deals available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {deals.map((deal) => (
                <AffiliateCard key={deal.id} deal={deal} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
