import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import type { Product, AffiliateDeal, ContactMessage } from "@shared/schema";
import { useState } from "react";
import { Trash2, Edit, Plus, Package, DollarSign, Users, MessageSquare } from "lucide-react";

export default function Admin() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    category: "",
    featured: false,
    inStock: true
  });

  const [affiliateForm, setAffiliateForm] = useState({
    title: "",
    description: "",
    originalPrice: "",
    discountPrice: "",
    affiliateUrl: "",
    imageUrl: "",
    category: "",
    isActive: true
  });

  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [editingAffiliate, setEditingAffiliate] = useState<string | null>(null);

  // Redirect if not admin
  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !user?.isAdmin)) {
      toast({
        title: "Access Denied",
        description: "You need admin privileges to access this page.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    }
  }, [isAuthenticated, isLoading, user, toast]);

  // Queries
  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ['/api/products'],
    enabled: !!(isAuthenticated && user?.isAdmin),
  });

  const { data: affiliateDeals = [] } = useQuery<AffiliateDeal[]>({
    queryKey: ['/api/affiliate-deals'],
    enabled: !!(isAuthenticated && user?.isAdmin),
  });

  const { data: contactMessages = [] } = useQuery<ContactMessage[]>({
    queryKey: ['/api/contact'],
    enabled: !!(isAuthenticated && user?.isAdmin),
  });

  // Mutations
  const createProductMutation = useMutation({
    mutationFn: async (data: any) => {
      const endpoint = editingProduct ? `/api/products/${editingProduct}` : '/api/products';
      const method = editingProduct ? 'PUT' : 'POST';
      await apiRequest(method, endpoint, {
        ...data,
        price: parseFloat(data.price).toString()
      });
    },
    onSuccess: () => {
      toast({
        title: editingProduct ? "Product Updated" : "Product Created",
        description: `Product has been ${editingProduct ? 'updated' : 'created'} successfully.`,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      setProductForm({
        name: "",
        description: "",
        price: "",
        imageUrl: "",
        category: "",
        featured: false,
        inStock: true
      });
      setEditingProduct(null);
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: `Failed to ${editingProduct ? 'update' : 'create'} product.`,
        variant: "destructive",
      });
    },
  });

  const createAffiliateMutation = useMutation({
    mutationFn: async (data: any) => {
      const endpoint = editingAffiliate ? `/api/affiliate-deals/${editingAffiliate}` : '/api/affiliate-deals';
      const method = editingAffiliate ? 'PUT' : 'POST';
      await apiRequest(method, endpoint, {
        ...data,
        originalPrice: parseFloat(data.originalPrice).toString(),
        discountPrice: parseFloat(data.discountPrice).toString()
      });
    },
    onSuccess: () => {
      toast({
        title: editingAffiliate ? "Deal Updated" : "Deal Created",
        description: `Affiliate deal has been ${editingAffiliate ? 'updated' : 'created'} successfully.`,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/affiliate-deals'] });
      setAffiliateForm({
        title: "",
        description: "",
        originalPrice: "",
        discountPrice: "",
        affiliateUrl: "",
        imageUrl: "",
        category: "",
        isActive: true
      });
      setEditingAffiliate(null);
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: `Failed to ${editingAffiliate ? 'update' : 'create'} affiliate deal.`,
        variant: "destructive",
      });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest('DELETE', `/api/products/${id}`);
    },
    onSuccess: () => {
      toast({
        title: "Product Deleted",
        description: "Product has been deleted successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete product.",
        variant: "destructive",
      });
    },
  });

  const deleteAffiliateMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest('DELETE', `/api/affiliate-deals/${id}`);
    },
    onSuccess: () => {
      toast({
        title: "Deal Deleted",
        description: "Affiliate deal has been deleted successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/affiliate-deals'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete affiliate deal.",
        variant: "destructive",
      });
    },
  });

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createProductMutation.mutate(productForm);
  };

  const handleAffiliateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createAffiliateMutation.mutate(affiliateForm);
  };

  const handleEditProduct = (product: Product) => {
    setProductForm({
      name: product.name,
      description: product.description || "",
      price: product.price,
      imageUrl: product.imageUrl || "",
      category: product.category || "",
      featured: product.featured || false,
      inStock: product.inStock || true
    });
    setEditingProduct(product.id);
  };

  const handleEditAffiliate = (deal: AffiliateDeal) => {
    setAffiliateForm({
      title: deal.title,
      description: deal.description || "",
      originalPrice: deal.originalPrice,
      discountPrice: deal.discountPrice,
      affiliateUrl: deal.affiliateUrl,
      imageUrl: deal.imageUrl || "",
      category: deal.category || "",
      isActive: deal.isActive || true
    });
    setEditingAffiliate(deal.id);
  };

  const stats = {
    totalProducts: products?.length || 0,
    totalDeals: affiliateDeals?.length || 0,
    totalMessages: contactMessages?.length || 0,
    unreadMessages: contactMessages?.filter((m: ContactMessage) => !m.isRead).length || 0
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user?.isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      {/* Page Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
              <p className="text-lg text-gray-600">Manage products, deals, and messages</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => window.location.href = "/api/logout"}
            >
              Logout
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Package className="w-8 h-8 text-primary" />
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">{stats.totalProducts}</div>
                    <div className="text-gray-600">Total Products</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <DollarSign className="w-8 h-8 text-accent" />
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">{stats.totalDeals}</div>
                    <div className="text-gray-600">Affiliate Deals</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <MessageSquare className="w-8 h-8 text-green-600" />
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">{stats.totalMessages}</div>
                    <div className="text-gray-600">Total Messages</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="w-8 h-8 text-purple-600" />
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">{stats.unreadMessages}</div>
                    <div className="text-gray-600">Unread Messages</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="products" className="space-y-6">
            <TabsList>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="affiliates">Affiliate Deals</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>

            {/* Products Tab */}
            <TabsContent value="products" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Add/Edit Product Form */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Plus className="w-5 h-5 mr-2" />
                      {editingProduct ? "Edit Product" : "Add New Product"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProductSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="name">Product Name</Label>
                        <Input
                          id="name"
                          value={productForm.name}
                          onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="price">Price (₹)</Label>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          value={productForm.price}
                          onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Input
                          id="category"
                          value={productForm.category}
                          onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="imageUrl">Image URL</Label>
                        <Input
                          id="imageUrl"
                          type="url"
                          value={productForm.imageUrl}
                          onChange={(e) => setProductForm({...productForm, imageUrl: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          rows={3}
                          value={productForm.description}
                          onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                        />
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="featured"
                            checked={productForm.featured}
                            onCheckedChange={(checked) => setProductForm({...productForm, featured: checked})}
                          />
                          <Label htmlFor="featured">Featured</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="inStock"
                            checked={productForm.inStock}
                            onCheckedChange={(checked) => setProductForm({...productForm, inStock: checked})}
                          />
                          <Label htmlFor="inStock">In Stock</Label>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          type="submit" 
                          disabled={createProductMutation.isPending}
                          className="flex-1"
                        >
                          {createProductMutation.isPending ? "Saving..." : (editingProduct ? "Update Product" : "Add Product")}
                        </Button>
                        {editingProduct && (
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={() => {
                              setEditingProduct(null);
                              setProductForm({
                                name: "",
                                description: "",
                                price: "",
                                imageUrl: "",
                                category: "",
                                featured: false,
                                inStock: true
                              });
                            }}
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </form>
                  </CardContent>
                </Card>

                {/* Products List */}
                <Card>
                  <CardHeader>
                    <CardTitle>Existing Products ({products?.length || 0})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {products?.map((product: Product) => (
                        <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-medium">{product.name}</h4>
                            <p className="text-sm text-gray-600">₹{parseFloat(product.price).toLocaleString()}</p>
                            <div className="flex space-x-2 mt-1">
                              {product.featured && <Badge variant="secondary">Featured</Badge>}
                              {!product.inStock && <Badge variant="destructive">Out of Stock</Badge>}
                              {product.category && <Badge variant="outline">{product.category}</Badge>}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditProduct(product)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteProductMutation.mutate(product.id)}
                              disabled={deleteProductMutation.isPending}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Affiliate Deals Tab */}
            <TabsContent value="affiliates" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Add/Edit Affiliate Form */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Plus className="w-5 h-5 mr-2" />
                      {editingAffiliate ? "Edit Affiliate Deal" : "Add New Affiliate Deal"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAffiliateSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="title">Deal Title</Label>
                        <Input
                          id="title"
                          value={affiliateForm.title}
                          onChange={(e) => setAffiliateForm({...affiliateForm, title: e.target.value})}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="originalPrice">Original Price (₹)</Label>
                          <Input
                            id="originalPrice"
                            type="number"
                            step="0.01"
                            value={affiliateForm.originalPrice}
                            onChange={(e) => setAffiliateForm({...affiliateForm, originalPrice: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="discountPrice">Discount Price (₹)</Label>
                          <Input
                            id="discountPrice"
                            type="number"
                            step="0.01"
                            value={affiliateForm.discountPrice}
                            onChange={(e) => setAffiliateForm({...affiliateForm, discountPrice: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="affiliateUrl">Affiliate URL</Label>
                        <Input
                          id="affiliateUrl"
                          type="url"
                          value={affiliateForm.affiliateUrl}
                          onChange={(e) => setAffiliateForm({...affiliateForm, affiliateUrl: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="categoryAffiliate">Category</Label>
                        <Input
                          id="categoryAffiliate"
                          value={affiliateForm.category}
                          onChange={(e) => setAffiliateForm({...affiliateForm, category: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="imageUrlAffiliate">Image URL</Label>
                        <Input
                          id="imageUrlAffiliate"
                          type="url"
                          value={affiliateForm.imageUrl}
                          onChange={(e) => setAffiliateForm({...affiliateForm, imageUrl: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="descriptionAffiliate">Description</Label>
                        <Textarea
                          id="descriptionAffiliate"
                          rows={3}
                          value={affiliateForm.description}
                          onChange={(e) => setAffiliateForm({...affiliateForm, description: e.target.value})}
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="isActive"
                          checked={affiliateForm.isActive}
                          onCheckedChange={(checked) => setAffiliateForm({...affiliateForm, isActive: checked})}
                        />
                        <Label htmlFor="isActive">Active</Label>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          type="submit" 
                          disabled={createAffiliateMutation.isPending}
                          className="flex-1"
                        >
                          {createAffiliateMutation.isPending ? "Saving..." : (editingAffiliate ? "Update Deal" : "Add Deal")}
                        </Button>
                        {editingAffiliate && (
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={() => {
                              setEditingAffiliate(null);
                              setAffiliateForm({
                                title: "",
                                description: "",
                                originalPrice: "",
                                discountPrice: "",
                                affiliateUrl: "",
                                imageUrl: "",
                                category: "",
                                isActive: true
                              });
                            }}
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </form>
                  </CardContent>
                </Card>

                {/* Affiliate Deals List */}
                <Card>
                  <CardHeader>
                    <CardTitle>Existing Deals ({affiliateDeals?.length || 0})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {affiliateDeals?.map((deal: AffiliateDeal) => (
                        <div key={deal.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-medium">{deal.title}</h4>
                            <p className="text-sm text-gray-600">
                              <span className="line-through">₹{parseFloat(deal.originalPrice).toLocaleString()}</span>
                              {" → "}
                              <span className="text-green-600 font-semibold">₹{parseFloat(deal.discountPrice).toLocaleString()}</span>
                            </p>
                            <div className="flex space-x-2 mt-1">
                              {deal.isActive ? (
                                <Badge className="bg-green-500">Active</Badge>
                              ) : (
                                <Badge variant="destructive">Inactive</Badge>
                              )}
                              {deal.category && <Badge variant="outline">{deal.category}</Badge>}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditAffiliate(deal)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteAffiliateMutation.mutate(deal.id)}
                              disabled={deleteAffiliateMutation.isPending}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Messages Tab */}
            <TabsContent value="messages" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Messages ({contactMessages?.length || 0})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {(contactMessages?.length || 0) === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        No contact messages yet.
                      </div>
                    ) : (
                      contactMessages?.map((message: ContactMessage) => (
                        <div key={message.id} className={`p-4 border rounded-lg ${!message.isRead ? 'bg-blue-50 border-blue-200' : ''}`}>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h4 className="font-medium">{message.firstName} {message.lastName}</h4>
                                {!message.isRead && <Badge variant="secondary">New</Badge>}
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{message.email}</p>
                              {message.phone && (
                                <p className="text-sm text-gray-600 mb-2">{message.phone}</p>
                              )}
                              {message.subject && (
                                <p className="font-medium mb-2">{message.subject}</p>
                              )}
                              <p className="text-gray-800">{message.message}</p>
                            </div>
                            <div className="text-sm text-gray-500">
                              {new Date(message.createdAt!).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
}
