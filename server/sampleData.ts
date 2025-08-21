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
        imageUrl: "/src/assets/81djvRJI7UL._UY1100__1755750600277.jpg",
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
        imageUrl: "/src/assets/mbp16-silver-cto-hero-202410_FMT_WHH_1755750600152.jpeg",
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
        imageUrl: "/src/assets/images_1755750599979.jpeg",
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
        imageUrl: "/src/assets/images (2)_1755750600018.jpeg",
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
        imageUrl: "/src/assets/images (3)_1755750600193.jpeg",
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
        imageUrl: "/src/assets/images (4)_1755750600475.jpeg",
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
        imageUrl: "/src/assets/images (5)_1755750600516.jpeg",
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
        imageUrl: "/src/assets/images (6)_1755750600555.jpeg",
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
        imageUrl: "/src/assets/images (7)_1755750600592.jpeg",
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
        imageUrl: "/src/assets/images (8)_1755750600630.jpeg",
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
        imageUrl: "/src/assets/images (9)_1755750600667.jpeg",
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