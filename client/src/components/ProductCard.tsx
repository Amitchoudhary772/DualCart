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
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <div className="aspect-square overflow-hidden rounded-t-lg">
          <img
            src={product.imageUrl || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="absolute top-2 right-2">
          <Button
            variant="ghost"
            size="sm"
            className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white/90"
          >
            <Heart className="w-4 h-4 text-gray-600" />
          </Button>
        </div>

        {product.featured && (
          <Badge className="absolute top-2 left-2 bg-primary text-white">
            BESTSELLER
          </Badge>
        )}
        
        {!product.inStock && (
          <Badge className="absolute top-2 left-2 bg-red-500 text-white">
            OUT OF STOCK
          </Badge>
        )}
      </div>

      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        {product.description && (
          <p className="text-gray-600 mb-4 text-sm line-clamp-2">
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
          <Badge variant="outline" className="mb-3">
            {product.category}
          </Badge>
        )}

        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-primary">
            ₹{parseFloat(product.price).toLocaleString()}
          </span>
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock || addToCartMutation.isPending}
            className="bg-primary text-white hover:bg-blue-700"
          >
            {addToCartMutation.isPending ? "Adding..." : "Add to Cart"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
