import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { AffiliateDeal } from "@shared/schema";
import { ExternalLink } from "lucide-react";

interface AffiliateCardProps {
  deal: AffiliateDeal;
}

export default function AffiliateCard({ deal }: AffiliateCardProps) {
  const handleBuyNow = () => {
    window.open(deal.affiliateUrl, '_blank', 'noopener,noreferrer');
  };

  const discountPercentage = deal.discountPercentage || 
    Math.round(((parseFloat(deal.originalPrice) - parseFloat(deal.discountPrice)) / parseFloat(deal.originalPrice)) * 100);

  return (
    <Card className="group hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-gray-900 to-black border border-amber-500/30 hover:border-amber-400/60 transform hover:-translate-y-2">
      <div className="relative">
        <div className="aspect-video overflow-hidden rounded-t-lg">
          <img
            src={deal.imageUrl || "/src/assets/shopping_1755750600114.webp"}
            alt={deal.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
        
        <div className="absolute top-2 right-2">
          <Badge className="bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-bold">
            -{discountPercentage}% OFF
          </Badge>
        </div>
      </div>

      <CardContent className="p-6 bg-gradient-to-b from-gray-900 to-black">
        <div className="flex items-center mb-3">
          <Badge className="bg-gradient-to-r from-amber-500 to-yellow-600 text-black mr-2 font-semibold">
            ✨ PREMIUM DEAL
          </Badge>
        </div>

        <h3 className="text-lg font-semibold text-amber-100 mb-2 line-clamp-2">
          {deal.title}
        </h3>
        
        {deal.description && (
          <p className="text-amber-200/70 mb-4 text-sm line-clamp-2">
            {deal.description}
          </p>
        )}

        {deal.category && (
          <Badge variant="outline" className="mb-4 border-amber-500/50 text-amber-300">
            {deal.category}
          </Badge>
        )}

        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-lg line-through text-amber-300/60">
              ₹{parseFloat(deal.originalPrice).toLocaleString()}
            </span>
            <span className="text-2xl font-bold bg-gradient-to-r from-amber-300 to-yellow-500 bg-clip-text text-transparent ml-2">
              ₹{parseFloat(deal.discountPrice).toLocaleString()}
            </span>
          </div>
        </div>

        <Button 
          onClick={handleBuyNow}
          className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-black hover:from-amber-400 hover:to-yellow-500 font-semibold"
        >
          Claim Exclusive Deal <ExternalLink className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}
