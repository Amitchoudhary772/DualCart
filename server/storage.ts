import {
  users,
  products,
  affiliateDeals,
  cartItems,
  contactMessages,
  type User,
  type UpsertUser,
  type Product,
  type InsertProduct,
  type AffiliateDeal,
  type InsertAffiliateDeal,
  type CartItem,
  type InsertCartItem,
  type ContactMessage,
  type InsertContactMessage,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(userData: Partial<User>): Promise<User>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Product operations
  getAllProducts(): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product>;
  deleteProduct(id: string): Promise<void>;
  
  // Affiliate deal operations
  getAllAffiliateDeals(): Promise<AffiliateDeal[]>;
  getActivateAffiliateDeals(): Promise<AffiliateDeal[]>;
  getAffiliateDealById(id: string): Promise<AffiliateDeal | undefined>;
  createAffiliateDeal(deal: InsertAffiliateDeal): Promise<AffiliateDeal>;
  updateAffiliateDeal(id: string, deal: Partial<InsertAffiliateDeal>): Promise<AffiliateDeal>;
  deleteAffiliateDeal(id: string): Promise<void>;
  
  // Cart operations
  getUserCart(userId: string): Promise<(CartItem & { product: Product })[]>;
  addToCart(cartItem: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: string, quantity: number): Promise<CartItem>;
  removeFromCart(id: string): Promise<void>;
  clearUserCart(userId: string): Promise<void>;
  
  // Contact operations
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getAllContactMessages(): Promise<ContactMessage[]>;
  markMessageAsRead(id: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.firstName, username));
    return user;
  }

  async createUser(userData: Partial<User>): Promise<User> {
    const [user] = await db.insert(users).values(userData as any).returning();
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Product operations
  async getAllProducts(): Promise<Product[]> {
    return await db.select().from(products).orderBy(desc(products.createdAt));
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return await db
      .select()
      .from(products)
      .where(eq(products.featured, true))
      .orderBy(desc(products.createdAt))
      .limit(8);
  }

  async getProductById(id: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db.insert(products).values(product).returning();
    return newProduct;
  }

  async updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product> {
    const [updatedProduct] = await db
      .update(products)
      .set({ ...product, updatedAt: new Date() })
      .where(eq(products.id, id))
      .returning();
    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<void> {
    await db.delete(products).where(eq(products.id, id));
  }

  // Affiliate deal operations
  async getAllAffiliateDeals(): Promise<AffiliateDeal[]> {
    return await db.select().from(affiliateDeals).orderBy(desc(affiliateDeals.createdAt));
  }

  async getActivateAffiliateDeals(): Promise<AffiliateDeal[]> {
    return await db
      .select()
      .from(affiliateDeals)
      .where(eq(affiliateDeals.isActive, true))
      .orderBy(desc(affiliateDeals.createdAt));
  }

  async getAffiliateDealById(id: string): Promise<AffiliateDeal | undefined> {
    const [deal] = await db.select().from(affiliateDeals).where(eq(affiliateDeals.id, id));
    return deal;
  }

  async createAffiliateDeal(deal: InsertAffiliateDeal): Promise<AffiliateDeal> {
    const [newDeal] = await db.insert(affiliateDeals).values(deal).returning();
    return newDeal;
  }

  async updateAffiliateDeal(id: string, deal: Partial<InsertAffiliateDeal>): Promise<AffiliateDeal> {
    const [updatedDeal] = await db
      .update(affiliateDeals)
      .set({ ...deal, updatedAt: new Date() })
      .where(eq(affiliateDeals.id, id))
      .returning();
    return updatedDeal;
  }

  async deleteAffiliateDeal(id: string): Promise<void> {
    await db.delete(affiliateDeals).where(eq(affiliateDeals.id, id));
  }

  // Cart operations
  async getUserCart(userId: string): Promise<(CartItem & { product: Product })[]> {
    return await db
      .select()
      .from(cartItems)
      .innerJoin(products, eq(cartItems.productId, products.id))
      .where(eq(cartItems.userId, userId))
      .then(rows => 
        rows.map(row => ({
          ...row.cart_items,
          product: row.products
        }))
      );
  }

  async addToCart(cartItem: InsertCartItem): Promise<CartItem> {
    // Check if item already exists in cart
    const [existingItem] = await db
      .select()
      .from(cartItems)
      .where(
        and(
          eq(cartItems.userId, cartItem.userId!),
          eq(cartItems.productId, cartItem.productId!)
        )
      );

    if (existingItem) {
      // Update quantity if item exists
      const [updatedItem] = await db
        .update(cartItems)
        .set({ quantity: (existingItem.quantity || 0) + (cartItem.quantity || 1) })
        .where(eq(cartItems.id, existingItem.id))
        .returning();
      return updatedItem;
    } else {
      // Add new item
      const [newItem] = await db.insert(cartItems).values(cartItem).returning();
      return newItem;
    }
  }

  async updateCartItem(id: string, quantity: number): Promise<CartItem> {
    const [updatedItem] = await db
      .update(cartItems)
      .set({ quantity })
      .where(eq(cartItems.id, id))
      .returning();
    return updatedItem;
  }

  async removeFromCart(id: string): Promise<void> {
    await db.delete(cartItems).where(eq(cartItems.id, id));
  }

  async clearUserCart(userId: string): Promise<void> {
    await db.delete(cartItems).where(eq(cartItems.userId, userId));
  }

  // Contact operations
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [newMessage] = await db.insert(contactMessages).values(message).returning();
    return newMessage;
  }

  async getAllContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  }

  async markMessageAsRead(id: string): Promise<void> {
    await db.update(contactMessages).set({ isRead: true }).where(eq(contactMessages.id, id));
  }
}

export const storage = new DatabaseStorage();
