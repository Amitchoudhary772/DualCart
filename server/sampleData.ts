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
        name: "MacBook Pro 16-inch",
        description: "Powerful Apple laptop with M-series chip, perfect for professionals and creators with stunning Retina display.",
        price: "199999",
        imageUrl: "/src/assets/mbp16-silver-cto-hero-202410_FMT_WHH_1755750600152.jpeg",
        category: "Electronics",
        inStock: true,
        featured: true,
        rating: "4.6",
        reviewCount: 89
      },
      {
        name: "Premium Cotton T-Shirt",
        description: "Comfortable, high-quality cotton t-shirt with modern fit and stylish design. Perfect for casual wear.",
        price: "799",
        imageUrl: "/src/assets/images_1755750599979.jpeg",
        category: "Fashion",
        inStock: true,
        featured: false,
        rating: "4.7",
        reviewCount: 67
      },
      {
        name: "Travel Backpack",
        description: "Durable and stylish travel backpack with multiple compartments perfect for adventures and daily use.",
        price: "2499",
        imageUrl: "/src/assets/images (2)_1755750600018.jpeg",
        category: "Accessories",
        inStock: true,
        featured: false,
        rating: "4.5",
        reviewCount: 156
      },
      {
        name: "Fresh Juice Blend",
        description: "Healthy and refreshing fruit juice blend made from premium organic fruits. Perfect for daily nutrition.",
        price: "299",
        imageUrl: "/src/assets/images (3)_1755750600193.jpeg",
        category: "Food & Beverages",
        inStock: true,
        featured: false,
        rating: "4.9",
        reviewCount: 43
      },
      {
        name: "Smartphone",
        description: "Latest smartphone with advanced camera system, fast processor and long-lasting battery life.",
        price: "45999",
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
        title: "Premium Cosmetics Set - 50% Off",
        description: "Complete beauty collection with makeup essentials. High-quality cosmetics for everyday glamour.",
        imageUrl: "/src/assets/images (5)_1755750600516.jpeg",
        category: "Beauty",
        originalPrice: "3999",
        discountPrice: "1999",
        discountPercentage: 50,
        affiliateUrl: "https://example.com/skincare-deal",
        isActive: true
      },
      {
        title: "Smart Home Device - 40% Off",
        description: "Voice-controlled smart speaker with AI assistant. Perfect for smart home control and entertainment.",
        imageUrl: "/src/assets/images (6)_1755750600555.jpeg",
        category: "Electronics",
        originalPrice: "4999",
        discountPrice: "2999",
        discountPercentage: 40,
        affiliateUrl: "https://example.com/echo-dot-deal",
        isActive: true
      },
      {
        title: "Premium Book Collection - 30% Off",
        description: "Curated collection of bestselling books. Perfect for reading enthusiasts and knowledge seekers.",
        imageUrl: "/src/assets/images (7)_1755750600592.jpeg",
        category: "Books",
        originalPrice: "2999",
        discountPrice: "2099",
        discountPercentage: 30,
        affiliateUrl: "https://example.com/books-deal",
        isActive: true
      },
      {
        title: "Fitness Equipment Set - 45% Off",
        description: "Complete fitness accessories bundle perfect for home workouts and staying healthy.",
        imageUrl: "/src/assets/images (8)_1755750600630.jpeg",
        category: "Fitness",
        originalPrice: "3499",
        discountPrice: "1924",
        discountPercentage: 45,
        affiliateUrl: "https://example.com/yoga-deal",
        isActive: true
      },
      {
        title: "Premium Kitchen Appliance - 40% Off",
        description: "High-quality kitchen appliance for modern cooking. Efficient and stylish design for every home.",
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