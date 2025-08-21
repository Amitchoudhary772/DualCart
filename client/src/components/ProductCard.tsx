import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import type { Product } from "@shared/schema";
import { Heart, Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  const addToCartMutation = useMutation({
    mutationFn: async (productId: string) => {
      await apiRequest('POST', '/api/cart', {
        productId,
        quantity: 1
      });
    },
    onSuccess: () => {
      toast({
        title: "Added to Cart",
        description: `${product.name} has been added to your cart.`,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Please Login",
          description: "You need to login to add items to cart.",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 1500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast({
        title: "Please Login",
        description: "You need to login to add items to cart.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 1500);
      return;
    }
    addToCartMutation.mutate(product.id);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />);
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
      }
    }

    return stars;
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 bg-white border border-gray-200 hover:border-red-300 transform hover:-translate-y-1">
      <div className="relative">
        <div className="aspect-square overflow-hidden rounded-t-lg">
          <img
            src={product.imageUrl || "/src/assets/004AY0001_04_Front_1755750600356.jpg"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
        
        <div className="absolute top-2 right-2">
          <Button
            variant="ghost"
            size="sm"
            className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-red-50 border border-gray-200"
          >
            <Heart className="w-4 h-4 text-gray-600 hover:text-red-600" />
          </Button>
        </div>

        {product.featured && (
          <Badge className="absolute top-2 left-2 bg-red-600 text-white font-bold">
            BESTSELLER
          </Badge>
        )}
        
        {!product.inStock && (
          <Badge className="absolute top-2 left-2 bg-red-500/90 text-white">
            OUT OF STOCK
          </Badge>
        )}
      </div>

      <CardContent className="p-4 lg:p-6 bg-white">
        <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        {product.description && (
          <p className="text-gray-600 mb-3 lg:mb-4 text-sm line-clamp-2">
            {product.description}
          </p>
        )}

        {product.rating && product.reviewCount && (
          <div className="flex items-center mb-3">
            <div className="flex">
              {renderStars(parseFloat(product.rating))}
            </div>
            <span className="text-gray-500 text-sm ml-2">
              ({product.reviewCount} reviews)
            </span>
          </div>
        )}

        {product.category && (
          <Badge variant="outline" className="mb-3 border-gray-300 text-gray-600">
            {product.category}
          </Badge>
        )}

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <span className="text-xl lg:text-2xl font-bold text-red-600">
            ₹{parseFloat(product.price).toLocaleString()}
          </span>
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock || addToCartMutation.isPending}
            className="bg-red-600 text-white hover:bg-red-700 font-semibold w-full sm:w-auto"
          >
            {addToCartMutation.isPending ? "Adding..." : "Add to Cart"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
