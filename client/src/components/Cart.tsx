import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { CartItem, Product } from "@shared/schema";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

interface CartProps {
  onClose: () => void;
}

export default function Cart({ onClose }: CartProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: cartItems = [], isLoading } = useQuery<(CartItem & { product: Product })[]>({
    queryKey: ['/api/cart'],
  });

  const updateQuantityMutation = useMutation({
    mutationFn: async ({ id, quantity }: { id: string; quantity: number }) => {
      await apiRequest('PUT', `/api/cart/${id}`, { quantity });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update quantity.",
        variant: "destructive",
      });
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest('DELETE', `/api/cart/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
      toast({
        title: "Item Removed",
        description: "Item has been removed from your cart.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove item.",
        variant: "destructive",
      });
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: async () => {
      await apiRequest('DELETE', '/api/cart');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
      toast({
        title: "Cart Cleared",
        description: "All items have been removed from your cart.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to clear cart.",
        variant: "destructive",
      });
    },
  });

  const total = cartItems.reduce((sum, item) => sum + (parseFloat(item.product.price) * item.quantity), 0);

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    updateQuantityMutation.mutate({ id, quantity });
  };

  const handleRemoveItem = (id: string) => {
    removeItemMutation.mutate(id);
  };

  const handleCheckout = () => {
    // Mock checkout - in real app, would integrate with payment processor
    toast({
      title: "Checkout",
      description: "Checkout functionality would be integrated with payment gateway.",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
        <p className="text-gray-600 mb-4">Add some products to get started!</p>
        <Button onClick={onClose}>
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Shopping Cart</h3>
        <Badge variant="outline">
          {cartItems.reduce((total, item) => total + item.quantity, 0)} items
        </Badge>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
            <img
              src={item.product.imageUrl || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80&h=80&fit=crop"}
              alt={item.product.name}
              className="w-16 h-16 object-cover rounded"
            />
            
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 line-clamp-2">{item.product.name}</h4>
              <p className="text-primary font-semibold">₹{parseFloat(item.product.price).toLocaleString()}</p>
              
              <div className="flex items-center mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1 || updateQuantityMutation.isPending}
                >
                  <Minus className="w-3 h-3" />
                </Button>
                <span className="mx-3 text-gray-900 min-w-[2rem] text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                  disabled={updateQuantityMutation.isPending}
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleRemoveItem(item.id)}
              disabled={removeItemMutation.isPending}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="border-t pt-6 mt-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-gray-900">Total:</span>
          <span className="text-2xl font-bold text-primary">₹{total.toLocaleString()}</span>
        </div>

        <div className="space-y-3">
          <Button 
            className="w-full bg-primary hover:bg-blue-700"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={onClose}
          >
            Continue Shopping
          </Button>

          {cartItems.length > 0 && (
            <Button 
              variant="ghost" 
              className="w-full text-red-500 hover:text-red-700"
              onClick={() => clearCartMutation.mutate()}
              disabled={clearCartMutation.isPending}
            >
              Clear Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
