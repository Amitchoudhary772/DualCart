import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import session from "express-session";
import { 
  insertProductSchema, 
  insertAffiliateDealSchema, 
  insertCartItemSchema, 
  insertContactMessageSchema 
} from "@shared/schema";
import { fromZodError } from "zod-validation-error";

// Simple fake authentication middleware
const isAuthenticated = (req: any, res: any, next: any) => {
  if (req.session?.user) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup simple session
  app.use(session({
    secret: 'fake-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { 
      secure: false, 
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  }));

  // Fake Auth routes
  app.post('/api/auth/login', async (req: any, res) => {
    try {
      const { username, password } = req.body;
      
      // Accept any username/password combination
      if (username && password) {
        // Create or get user with this username
        let user = await storage.getUserByUsername(username);
        if (!user) {
          // Create new user if doesn't exist
          user = await storage.createUser({
            id: `user_${Date.now()}`,
            email: `${username}@fake.com`,
            firstName: username,
            lastName: "User",
            profileImageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
            isAdmin: username.toLowerCase() === 'admin'
          });
        }
        
        req.session.user = user;
        res.json({ message: "Login successful", user });
      } else {
        res.status(400).json({ message: "Username and password required" });
      }
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  app.post('/api/auth/signup', async (req: any, res) => {
    try {
      const { username, password, email } = req.body;
      
      // Accept any signup data
      if (username && password) {
        const user = await storage.createUser({
          id: `user_${Date.now()}`,
          email: email || `${username}@fake.com`,
          firstName: username,
          lastName: "User",
          profileImageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
          isAdmin: username.toLowerCase() === 'admin'
        });
        
        req.session.user = user;
        res.json({ message: "Signup successful", user });
      } else {
        res.status(400).json({ message: "Username and password required" });
      }
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ message: "Signup failed" });
    }
  });

  app.post('/api/auth/logout', (req: any, res) => {
    req.session.destroy((err: any) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.json({ message: "Logout successful" });
    });
  });

  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      res.json(req.session.user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Product routes
  app.get('/api/products', async (req, res) => {
    try {
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get('/api/products/featured', async (req, res) => {
    try {
      const products = await storage.getFeaturedProducts();
      res.json(products);
    } catch (error) {
      console.error("Error fetching featured products:", error);
      res.status(500).json({ message: "Failed to fetch featured products" });
    }
  });

  app.get('/api/products/:id', async (req, res) => {
    try {
      const product = await storage.getProductById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  app.post('/api/products', isAuthenticated, async (req: any, res) => {
    try {
      const user = req.session.user;
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }

      const result = insertProductSchema.safeParse(req.body);
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ message: validationError.toString() });
      }

      const product = await storage.createProduct(result.data);
      res.json(product);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ message: "Failed to create product" });
    }
  });

  app.put('/api/products/:id', isAuthenticated, async (req: any, res) => {
    try {
      const user = req.session.user;
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }

      const result = insertProductSchema.partial().safeParse(req.body);
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ message: validationError.toString() });
      }

      const product = await storage.updateProduct(req.params.id, result.data);
      res.json(product);
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ message: "Failed to update product" });
    }
  });

  app.delete('/api/products/:id', isAuthenticated, async (req: any, res) => {
    try {
      const user = req.session.user;
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }

      await storage.deleteProduct(req.params.id);
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ message: "Failed to delete product" });
    }
  });

  // Affiliate deal routes
  app.get('/api/affiliate-deals', async (req, res) => {
    try {
      const deals = await storage.getActivateAffiliateDeals();
      res.json(deals);
    } catch (error) {
      console.error("Error fetching affiliate deals:", error);
      res.status(500).json({ message: "Failed to fetch affiliate deals" });
    }
  });

  app.post('/api/affiliate-deals', isAuthenticated, async (req: any, res) => {
    try {
      const user = req.session.user;
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }

      const result = insertAffiliateDealSchema.safeParse(req.body);
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ message: validationError.toString() });
      }

      // Calculate discount percentage if not provided
      if (!result.data.discountPercentage) {
        const originalPrice = parseFloat(result.data.originalPrice.toString());
        const discountPrice = parseFloat(result.data.discountPrice.toString());
        result.data.discountPercentage = Math.round(((originalPrice - discountPrice) / originalPrice) * 100);
      }

      const deal = await storage.createAffiliateDeal(result.data);
      res.json(deal);
    } catch (error) {
      console.error("Error creating affiliate deal:", error);
      res.status(500).json({ message: "Failed to create affiliate deal" });
    }
  });

  app.put('/api/affiliate-deals/:id', isAuthenticated, async (req: any, res) => {
    try {
      const user = req.session.user;
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }

      const result = insertAffiliateDealSchema.partial().safeParse(req.body);
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ message: validationError.toString() });
      }

      const deal = await storage.updateAffiliateDeal(req.params.id, result.data);
      res.json(deal);
    } catch (error) {
      console.error("Error updating affiliate deal:", error);
      res.status(500).json({ message: "Failed to update affiliate deal" });
    }
  });

  app.delete('/api/affiliate-deals/:id', isAuthenticated, async (req: any, res) => {
    try {
      const user = req.session.user;
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }

      await storage.deleteAffiliateDeal(req.params.id);
      res.json({ message: "Affiliate deal deleted successfully" });
    } catch (error) {
      console.error("Error deleting affiliate deal:", error);
      res.status(500).json({ message: "Failed to delete affiliate deal" });
    }
  });

  // Cart routes
  app.get('/api/cart', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.session.user.id;
      const cartItems = await storage.getUserCart(userId);
      res.json(cartItems);
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ message: "Failed to fetch cart" });
    }
  });

  app.post('/api/cart', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.session.user.id;
      const result = insertCartItemSchema.safeParse({ ...req.body, userId });
      
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ message: validationError.toString() });
      }

      const cartItem = await storage.addToCart(result.data);
      res.json(cartItem);
    } catch (error) {
      console.error("Error adding to cart:", error);
      res.status(500).json({ message: "Failed to add to cart" });
    }
  });

  app.put('/api/cart/:id', isAuthenticated, async (req: any, res) => {
    try {
      const { quantity } = req.body;
      if (typeof quantity !== 'number' || quantity < 1) {
        return res.status(400).json({ message: "Invalid quantity" });
      }

      const cartItem = await storage.updateCartItem(req.params.id, quantity);
      res.json(cartItem);
    } catch (error) {
      console.error("Error updating cart item:", error);
      res.status(500).json({ message: "Failed to update cart item" });
    }
  });

  app.delete('/api/cart/:id', isAuthenticated, async (req: any, res) => {
    try {
      await storage.removeFromCart(req.params.id);
      res.json({ message: "Item removed from cart" });
    } catch (error) {
      console.error("Error removing from cart:", error);
      res.status(500).json({ message: "Failed to remove from cart" });
    }
  });

  app.delete('/api/cart', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.session.user.id;
      await storage.clearUserCart(userId);
      res.json({ message: "Cart cleared" });
    } catch (error) {
      console.error("Error clearing cart:", error);
      res.status(500).json({ message: "Failed to clear cart" });
    }
  });

  // Order routes
  app.post('/api/orders', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.session.user.id;
      
      // Mock order processing - in a real app, you'd integrate with payment gateway
      const orderData = {
        userId,
        ...req.body,
        status: 'confirmed',
        orderDate: new Date()
      };
      
      // Clear the user's cart after successful order
      await storage.clearUserCart(userId);
      
      res.json({ 
        message: "Order placed successfully", 
        orderId: `ORD-${Date.now()}`,
        ...orderData 
      });
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  // Contact routes
  app.post('/api/contact', async (req, res) => {
    try {
      const result = insertContactMessageSchema.safeParse(req.body);
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ message: validationError.toString() });
      }

      const message = await storage.createContactMessage(result.data);
      res.json(message);
    } catch (error) {
      console.error("Error creating contact message:", error);
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  app.get('/api/contact', isAuthenticated, async (req: any, res) => {
    try {
      const user = req.session.user;
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }

      const messages = await storage.getAllContactMessages();
      res.json(messages);
    } catch (error) {
      console.error("Error fetching contact messages:", error);
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
