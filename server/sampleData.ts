import { db } from "./db";
import { products, affiliateDeals, users } from "@shared/schema";

export async function seedDatabase() {
  try {
    // Check if data already exists
    const existingProducts = await db.select().from(products).limit(1);
    if (existingProducts.length > 0) {
      console.log("Database already seeded");
      return;
    }

    // Add sample products
    const sampleProducts = [
      {
        name: "Premium Wireless Headphones",
        description: "High-quality noise-cancelling wireless headphones with 30-hour battery life and crystal-clear sound quality.",
        price: "4999",
        imageUrl: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop",
        category: "Electronics",
        inStock: true,
        featured: true,
        rating: "4.8",
        reviewCount: 124
      },
      {
        name: "Smart Fitness Watch",
        description: "Track your health and fitness with this advanced smartwatch featuring heart rate monitoring and GPS.",
        price: "8999",
        imageUrl: "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=500&h=500&fit=crop",
        category: "Electronics",
        inStock: true,
        featured: true,
        rating: "4.6",
        reviewCount: 89
      },
      {
        name: "Eco-Friendly Water Bottle",
        description: "Sustainable stainless steel water bottle that keeps drinks cold for 24 hours and hot for 12 hours.",
        price: "1299",
        imageUrl: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=500&h=500&fit=crop",
        category: "Lifestyle",
        inStock: true,
        featured: false,
        rating: "4.7",
        reviewCount: 67
      },
      {
        name: "Professional Laptop Backpack",
        description: "Durable and stylish laptop backpack with multiple compartments and USB charging port.",
        price: "2499",
        imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
        category: "Accessories",
        inStock: true,
        featured: false,
        rating: "4.5",
        reviewCount: 156
      },
      {
        name: "Organic Green Tea Set",
        description: "Premium organic green tea collection with 6 different flavors and a beautiful tea infuser.",
        price: "899",
        imageUrl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&h=500&fit=crop",
        category: "Food & Beverages",
        inStock: true,
        featured: false,
        rating: "4.9",
        reviewCount: 43
      },
      {
        name: "Wireless Charging Stand",
        description: "Fast wireless charging stand compatible with all Qi-enabled devices. Perfect for desk use.",
        price: "1799",
        imageUrl: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=500&h=500&fit=crop",
        category: "Electronics",
        inStock: true,
        featured: true,
        rating: "4.4",
        reviewCount: 78
      }
    ];

    await db.insert(products).values(sampleProducts);

    // Add sample affiliate deals
    const sampleDeals = [
      {
        title: "50% Off Premium Skincare Set",
        description: "Get glowing skin with this complete skincare routine. Includes cleanser, toner, serum, and moisturizer.",
        imageUrl: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=500&fit=crop",
        category: "Beauty",
        originalPrice: "3999",
        discountPrice: "1999",
        discountPercentage: 50,
        affiliateUrl: "https://example.com/skincare-deal",
        isActive: true
      },
      {
        title: "Amazon Echo Dot (5th Gen) - 40% Off",
        description: "Smart speaker with Alexa. Control your smart home, play music, and get answers to your questions.",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop",
        category: "Electronics",
        originalPrice: "4999",
        discountPrice: "2999",
        discountPercentage: 40,
        affiliateUrl: "https://example.com/echo-dot-deal",
        isActive: true
      },
      {
        title: "Best Seller Book Collection - 30% Off",
        description: "Collection of top 10 bestselling books this year. Perfect for book lovers and gift giving.",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop",
        category: "Books",
        originalPrice: "2999",
        discountPrice: "2099",
        discountPercentage: 30,
        affiliateUrl: "https://example.com/books-deal",
        isActive: true
      },
      {
        title: "Yoga Mat & Accessories Bundle - 45% Off",
        description: "Complete yoga starter kit with premium mat, blocks, strap, and carry bag. Perfect for beginners and pros.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop",
        category: "Fitness",
        originalPrice: "3499",
        discountPrice: "1924",
        discountPercentage: 45,
        affiliateUrl: "https://example.com/yoga-deal",
        isActive: true
      },
      {
        title: "Kitchen Knife Set - Professional Grade",
        description: "5-piece professional kitchen knife set with wooden block. Sharp, durable, and ergonomic design.",
        imageUrl: "https://images.unsplash.com/photo-1593618998874-76aea3d5e5d3?w=500&h=500&fit=crop",
        category: "Kitchen",
        originalPrice: "5999",
        discountPrice: "3599",
        discountPercentage: 40,
        affiliateUrl: "https://example.com/knife-set-deal",
        isActive: true
      }
    ];

    await db.insert(affiliateDeals).values(sampleDeals);

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}