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
    <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-accent">
      <div className="aspect-video overflow-hidden rounded-t-lg">
        <img
          src={deal.imageUrl || "/src/assets/shopping_1755750600114.webp"}
          alt={deal.title}
          className="w-full h-full object-cover"
        />
      </div>

      <CardContent className="p-6">
        <div className="flex items-center mb-3">
          <Badge className="bg-accent text-white mr-2">
            AFFILIATE DEAL
          </Badge>
          <Badge variant="outline" className="text-success border-success">
            {discountPercentage}% OFF
          </Badge>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {deal.title}
        </h3>
        
        {deal.description && (
          <p className="text-gray-600 mb-4 text-sm line-clamp-2">
            {deal.description}
          </p>
        )}

        {deal.category && (
          <Badge variant="outline" className="mb-4">
            {deal.category}
          </Badge>
        )}

        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-lg line-through text-gray-400">
              ₹{parseFloat(deal.originalPrice).toLocaleString()}
            </span>
            <span className="text-2xl font-bold text-success ml-2">
              ₹{parseFloat(deal.discountPrice).toLocaleString()}
            </span>
          </div>
        </div>

        <Button 
          onClick={handleBuyNow}
          className="w-full bg-accent text-white hover:bg-yellow-500"
        >
          Buy Now <ExternalLink className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}
